import {argv} from 'yargs';
import {SeedConfig} from './seed.config';

export class SeedAdvancedConfig extends SeedConfig {

  constructor() {
    super();
    let arg: string;
    if (argv && argv._) {
      arg = argv._[0];
      if (arg.indexOf('desktop') > -1) {
        this.TARGET_DESKTOP = true;
        if (arg.indexOf('.mac') > -1 || arg.indexOf('.windows') > -1 || arg.indexOf('.linus') > -1) {
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

    // Desktop must use relative paths    
    let prefix = this.TARGET_DESKTOP ? '' : this.APP_BASE;

    // Dev
    this.SYSTEM_CONFIG.paths[this.BOOTSTRAP_MODULE] = `${prefix}${this.BOOTSTRAP_MODULE}`;
    this.SYSTEM_CONFIG.paths['angulartics2'] = `${prefix}node_modules/angulartics2/index`;
    this.SYSTEM_CONFIG.paths['angulartics2/*'] = `${prefix}node_modules/angulartics2/*`;
    this.SYSTEM_CONFIG.paths['lodash'] = `${prefix}node_modules/lodash/index`;
    this.SYSTEM_CONFIG.paths['ngrx-store-router'] = `${prefix}node_modules/ngrx-store-router/index`;
    this.SYSTEM_CONFIG['map'] = {
      '@ngrx/store': `${prefix}node_modules/@ngrx/store/dist/index`
    };

    if (this.TARGET_DESKTOP) {
      // desktop configuration
      this.SYSTEM_CONFIG.paths['ng2-translate/*'] = `${prefix}node_modules/ng2-translate/*`;
      this.SYSTEM_CONFIG.paths['@ngrx/store'] = `${prefix}node_modules/@ngrx/store/dist/index`;
      this.SYSTEM_CONFIG.paths['reflect-metadata'] = `${prefix}node_modules/reflect-metadata/Reflect`;
      delete this.SYSTEM_CONFIG['map'];
    }    
    
    // Prod
    this.SYSTEM_BUILDER_CONFIG.paths['lodash'] = `node_modules/lodash/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['ngrx-store-router'] = `node_modules/ngrx-store-router/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['map'] = {
      '@ngrx/store': `node_modules/@ngrx/store/dist/index`
    };
  }
}
