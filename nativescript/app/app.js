"use strict";
require('reflect-metadata');
require('rxjs/add/operator/map');
// nativescript
var application_1 = require('nativescript-angular/application');
var router_1 = require('nativescript-angular/router');
// angular 
var core_1 = require('angular2/core');
// libs
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var nativescript_ng2_translate_1 = require('nativescript-ng2-translate/nativescript-ng2-translate');
// config
var index_1 = require('./frameworks/core.framework/index');
index_1.CoreConfigService.PLATFORM_TARGET = index_1.CoreConfigService.PLATFORMS.MOBILE_NATIVE;
index_1.CoreConfigService.DEBUG.LEVEL_4 = true;
index_1.CoreConfigService.ROUTER_DIRECTIVES = router_1.NS_ROUTER_DIRECTIVES;
// app
var index_2 = require('./frameworks/nativescript.framework/index');
var app_component_1 = require('./pages/app/app.component');
var index_3 = require('./shared/core/index');
// avoids change detection errors
// TODO: understand why detection errors occur when not in production mode
core_1.enableProdMode();
application_1.nativeScriptBootstrap(app_component_1.NSAppComponent, [
    core_1.provide(index_1.WindowService, { useClass: index_3.WindowNative }),
    index_3.ModalNative,
    router_1.NS_ROUTER_PROVIDERS,
    core_1.provide(ng2_translate_1.TranslateLoader, {
        useFactory: function () {
            return new nativescript_ng2_translate_1.TNSTranslateLoader('assets/i18n');
        }
    }),
    index_2.NS_APP_PROVIDERS
]);
//# sourceMappingURL=app.js.map