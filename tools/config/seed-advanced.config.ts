import {argv} from 'yargs';
import {SeedConfig} from './seed.config';
import {systemJsPackages} from '../utils/project/systemjs-packages';

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
    this.BOOTSTRAP_MODULE = bootstrap;
    
    this.APP_TITLE = 'Angular 2 Seed Advanced';

    // Dev  
    if (this.TARGET_DESKTOP) {
      // desktop configuration
      this.APP_BASE = ''; // paths must remain relative

      // reset system config with new APP_BASE      
      this.SYSTEM_CONFIG = {
        defaultJSExtensions: true,
        paths: {
          [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
          'rxjs/*': `${this.APP_BASE}rxjs/*`,
          'app/*': `/app/*`,
          '*': `${this.APP_BASE}node_modules/*`
        }
      };
      
      this.SYSTEM_CONFIG.paths['ng2-translate/*'] = `${this.APP_BASE}node_modules/ng2-translate/*`;
      this.SYSTEM_CONFIG.paths['reflect-metadata'] = `${this.APP_BASE}node_modules/reflect-metadata/Reflect`;
    } 

    this.SYSTEM_CONFIG['packageConfigPaths'] = [
      `${this.APP_BASE}node_modules/*/package.json`,
      `${this.APP_BASE}node_modules/@angular/*/package.json`,
      `${this.APP_BASE}node_modules/@ngrx/*/package.json`
    ]; 
    this.SYSTEM_CONFIG['packages'] = systemJsPackages();

    this.SYSTEM_CONFIG.paths[this.BOOTSTRAP_MODULE] = `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`;
    this.SYSTEM_CONFIG.paths['angulartics2'] = `${this.APP_BASE}node_modules/angulartics2/index`;
    this.SYSTEM_CONFIG.paths['angulartics2/*'] = `${this.APP_BASE}node_modules/angulartics2/*`;
    this.SYSTEM_CONFIG.paths['lodash'] = `${this.APP_BASE}node_modules/lodash/index`;
    
    // Prod
    delete this.SYSTEM_BUILDER_CONFIG['packageConfigPaths']; // not all libs are distributed the same
    this.SYSTEM_BUILDER_CONFIG['packages'] = systemJsPackages();
    this.SYSTEM_BUILDER_CONFIG.paths['angulartics2'] = `node_modules/angulartics2/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['lodash'] = `node_modules/lodash/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@ngrx/core'] = `node_modules/@ngrx/core/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@ngrx/store'] = `node_modules/@ngrx/store/index.js`;
  }
}
