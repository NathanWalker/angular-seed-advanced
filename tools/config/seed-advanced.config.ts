import { argv } from 'yargs';
import { SeedConfig } from './seed.config';

export class SeedAdvancedConfig extends SeedConfig {

  constructor() {
    super();
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
    if (this.ENABLE_HOT_LOADING) {
      bootstrap   = 'hot_loader_main';
    } else if (this.TARGET_MOBILE_HYBRID) {
      bootstrap   = 'main.mobile.hybrid'; // Cordova
    }

    // Override seed defaults
    this.BOOTSTRAP_DIR = argv['app'] ? (argv['app'] + '/') : '';
    this.BOOTSTRAP_MODULE = `${this.BOOTSTRAP_DIR}` + (this.ENABLE_HOT_LOADING ? 'hot_loader_main' : bootstrap);
    this.NG_FACTORY_FILE = `${bootstrap}.prod`;
    this.BOOTSTRAP_PROD_MODULE = `${this.BOOTSTRAP_DIR}${bootstrap}`;
    this.BOOTSTRAP_FACTORY_PROD_MODULE = `${this.BOOTSTRAP_DIR}${bootstrap}.prod`;

    this.APP_TITLE = 'Angular 2 Seed Advanced';
    this.APP_BASE = ''; // paths must remain relative

    /** Development **/

    // Fix up package configuration for libs and @ngrx
    this.SYSTEM_CONFIG['packageConfigPaths'] = [
      `${this.APP_BASE}node_modules/*/package.json`,
      `${this.APP_BASE}node_modules/@ngrx/*/package.json`
    ];

    if (!this.SYSTEM_CONFIG['packages']) this.SYSTEM_CONFIG['packages'] = {};
    this.SYSTEM_CONFIG['packages']['@ngrx/core'] = {
      main: 'bundles/core.umd.js',
      defaultExtension: 'js'
    };
    this.SYSTEM_CONFIG['packages']['@ngrx/store'] = {
      main: 'bundles/store.umd.js',
      defaultExtension: 'js'
    };
    this.SYSTEM_CONFIG['packages']['@ngrx/effects'] = {
      main: 'bundles/effects.umd.js',
      defaultExtension: 'js'
    };

    // Fix up paths for libs
    this.SYSTEM_CONFIG.paths[this.BOOTSTRAP_MODULE] = `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`;
    this.SYSTEM_CONFIG.paths['angulartics2'] = `${this.APP_BASE}node_modules/angulartics2/index`;
    this.SYSTEM_CONFIG.paths['angulartics2/*'] = `${this.APP_BASE}node_modules/angulartics2/*`;
    this.SYSTEM_CONFIG.paths['lodash'] = `${this.APP_BASE}node_modules/lodash/index`;

    // testing support for @ngrx/effects
    this.SYSTEM_CONFIG.paths['@ngrx/effects/testing'] = `node_modules/@ngrx/effects/testing/index`;

    /** Production **/

    delete this.SYSTEM_BUILDER_CONFIG['packageConfigPaths']; // not all libs are distributed the same
    this.SYSTEM_BUILDER_CONFIG['packages']['@ngrx/core'] = {
      main: 'index.js',
      defaultExtension: 'js'
    };
    this.SYSTEM_BUILDER_CONFIG['packages']['@ngrx/store'] = {
      main: 'index.js',
      defaultExtension: 'js'
    };
    this.SYSTEM_BUILDER_CONFIG['packages']['@ngrx/effects'] = {
      main: 'index.js',
      defaultExtension: 'js'
    };
    this.SYSTEM_BUILDER_CONFIG.paths['angulartics2'] = `node_modules/angulartics2/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['lodash'] = `node_modules/lodash/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@ngrx/core'] = `node_modules/@ngrx/core/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@ngrx/store'] = `node_modules/@ngrx/store/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@ngrx/effects'] = `node_modules/@ngrx/effects/index.js`;
  }
}
