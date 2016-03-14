import {argv} from 'yargs';
import {SeedConfig} from './seed.config';

export class SeedAdvancedConfig extends SeedConfig {
  
  TARGET_WEB           = !!argv['web'];
  TARGET_MOBILE_HYBRID = !!argv['mobile-hybrid'];
  TARGET_DESKTOP       = !!argv['desktop'];

  constructor() {
    super();
    
    let bootstrap = 'main.web';
    if (this.ENABLE_HOT_LOADING) {
      bootstrap   = 'hot_loader_main';
    } else if (this.TARGET_WEB) {
      bootstrap   = 'main.web';
    } else if (this.TARGET_MOBILE_HYBRID) {
      bootstrap   = 'main.mobile.hybrid'; // Cordova
    } else if (this.TARGET_DESKTOP) {
      bootstrap   = 'main.desktop'; // Electron
    }
    this.BOOTSTRAP_MODULE = bootstrap;
    
    this.APP_TITLE = 'Angular 2 Seed Advanced';
    
    // Dev
    this.SYSTEM_CONFIG.paths[this.BOOTSTRAP_MODULE] = `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`;
    this.SYSTEM_CONFIG.paths['lodash'] = `${this.APP_BASE}node_modules/lodash/index`;
    this.SYSTEM_CONFIG.paths['ngrx-store-router'] = `${this.APP_BASE}node_modules/ngrx-store-router/index`;
    this.SYSTEM_CONFIG['map'] = {
      '@ngrx/store': `${this.APP_BASE}node_modules/@ngrx/store/dist/index`
    };
    
    // Prod
    this.SYSTEM_BUILDER_CONFIG.paths['lodash'] = `node_modules/lodash/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['ngrx-store-router'] = `node_modules/ngrx-store-router/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['map'] = {
      '@ngrx/store': `node_modules/@ngrx/store/dist/index`
    };
  }
}
