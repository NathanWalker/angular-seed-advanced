import { argv } from 'yargs';
import { SeedConfig } from './seed.config';
import * as path from 'path';
import { ExtendPackages } from './seed.config.interfaces';

export class SeedAdvancedConfig extends SeedConfig {
  /**
   * The base folder of the nativescript applications source files.
   * @type {string}
   */
  TNS_BASE_DIR = 'nativescript';

  srcSubdir = 'src';
  destSubdir = 'app';

  TNS_APP_SRC = `${this.TNS_BASE_DIR}/${this.srcSubdir}`;

  TNS_APP_DEST = `${this.TNS_BASE_DIR}/${this.destSubdir}`;

  TNS_CONFIG = {
    ANALYTICS_TRACKING_ID: '',
  };

  constructor() {
    super();

    this.ENABLE_SCSS = true;

    let arg: string;
    if (argv && argv._) {
      arg = argv._[0];
      if (arg.indexOf('desktop') > -1) {
        this.TARGET_DESKTOP = true;
        if (arg.indexOf('.mac') > -1 || arg.indexOf('.windows') > -1 || arg.indexOf('.linux') > -1) {
          this.TARGET_DESKTOP_BUILD = true;
        }
      } else if (arg.indexOf('hybrid') > -1) {
        this.TARGET_MOBILE_HYBRID = true;
      }
    }
    let bootstrap = 'main.web';
    if (this.TARGET_MOBILE_HYBRID) {
      // Perhaps Ionic or Cordova
      // This is not implemented in the seed but here to show you way forward if you wanted to add
      bootstrap   = 'main.mobile.hybrid';
    }

    if (argv['analytics']) {
      this.TNS_CONFIG.ANALYTICS_TRACKING_ID = argv['analytics'];
    }

    // Override seed defaults
    this.BOOTSTRAP_DIR = argv['app'] ? (argv['app'] + '/') : '';
    this.BOOTSTRAP_MODULE = `${this.BOOTSTRAP_DIR}${bootstrap}`;
    this.NG_FACTORY_FILE = `${bootstrap}.prod`;
    this.BOOTSTRAP_PROD_MODULE = `${this.BOOTSTRAP_DIR}${bootstrap}`;
    this.BOOTSTRAP_FACTORY_PROD_MODULE = `${this.BOOTSTRAP_DIR}${bootstrap}.prod`;

    this.APP_TITLE = 'Angular Seed Advanced';
    this.APP_BASE = ''; // paths must remain relative

    // Advanced seed packages
    let additionalPackages: ExtendPackages[] = [
      {
        name: 'lodash',
        path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
        packageMeta: {
          main: 'index.js',
          defaultExtension: 'js'
        }
      },
      {
        name: '@ngrx/core',
        packageMeta: {
          main: 'bundles/core.umd.js',
          defaultExtension: 'js'
        }
      },
      {
        name: '@ngrx/store',
        packageMeta: {
          main: 'bundles/store.umd.js',
          defaultExtension: 'js'
        }
      },
      {
        name: '@ngrx/effects',
        packageMeta: {
          main: 'bundles/effects.umd.js',
          defaultExtension: 'js'
        }
      },
      {
        name: '@ngrx/effects/testing',
        path: `${this.APP_BASE}node_modules/@ngrx/effects/testing/index.js`
      },
      {
        name: '@ngrx/store-devtools',
        packageMeta: {
          main: 'bundles/store-devtools.umd.js',
          defaultExtension: 'js'
        }
      },
      {
        name: 'ng2-translate',
        packageMeta: {
          main: 'bundles/index.js',
          defaultExtension: 'js'
        }
      },
      {
        name: 'angulartics2',
        packageMeta: {
          main: 'dist/index.js',
          defaultExtension: 'js'
        }
      },
      {
        name: 'angulartics2/dist/providers',
        packageMeta: {
          main: 'index.js',
          defaultExtension: 'js'
        }
      },
      {
        name: 'ngrx-store-freeze',
        path: `${this.APP_BASE}node_modules/ngrx-store-freeze/dist/index.js`
      },
      {
        name: 'deep-freeze-strict',
        path: `${this.APP_BASE}node_modules/deep-freeze-strict/index.js`
      }
    ];

    this.addPackagesBundles(additionalPackages);

    // Settings for building sass for tns modules
    this.PLUGIN_CONFIGS['gulp-sass-tns'] = {
      includePaths: [
        this.srcSubdir,
        './node_modules/',
        './node_modules/nativescript-theme-core/scss/'
      ].map((dir) => path.resolve(this.TNS_BASE_DIR, dir)),
    };

    // Fix up path to bootstrap module
    this.SYSTEM_CONFIG.paths[this.BOOTSTRAP_MODULE] = `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`;

    /** Production **/

    delete this.SYSTEM_BUILDER_CONFIG['packageConfigPaths']; // not all libs are distributed the same
  }
}
