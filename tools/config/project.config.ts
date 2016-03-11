import {join} from 'path';
import {argv} from 'yargs';
import {SeedConfig, normalizeDependencies} from './seed.config';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  
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
    
    let additional_deps: Array<any> = [
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    this.DEV_NPM_DEPENDENCIES = this.DEV_DEPENDENCIES.concat(normalizeDependencies(additional_deps));
    this.PROD_NPM_DEPENDENCIES = this.PROD_NPM_DEPENDENCIES.concat(normalizeDependencies(additional_deps));

    this.APP_ASSETS = [
      // {src: `${this.ASSETS_SRC}/css/toastr.min.css`, inject: true},
      // {src: `${this.APP_DEST}/assets/scss/global.css`, inject: true},
      { src: `${this.ASSETS_SRC}/main.css`, inject: true },
    ];

    this.DEV_DEPENDENCIES = this.DEV_NPM_DEPENDENCIES.concat(this.APP_ASSETS);
    this.PROD_DEPENDENCIES = this.PROD_NPM_DEPENDENCIES.concat(this.APP_ASSETS);
    
    // Dev
    this.SYSTEM_CONFIG.paths[this.BOOTSTRAP_MODULE] = `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`;
    this.SYSTEM_CONFIG.paths['lodash'] = `${this.APP_BASE}node_modules/lodash/index`;
    this.SYSTEM_CONFIG['map'] = {
      '@ngrx/store': `${this.APP_BASE}node_modules/@ngrx/store/dist/index`
    };
    
    // Prod
    this.SYSTEM_BUILDER_CONFIG.paths['lodash'] = `node_modules/lodash/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['map'] = {
      '@ngrx/store': `node_modules/@ngrx/store/dist/index`
    };
  }
}
