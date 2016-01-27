"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// angular
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var router_1 = require('angular2/router');
// libs
var ng2_translate_1 = require('ng2-translate/ng2-translate');
// app
var index_1 = require('../core.framework/index');
var app_config_service_1 = require('./services/app-config.service');
var index_2 = require('../i18n.framework/index');
exports.APP_PROVIDERS = [
    http_1.HTTP_PROVIDERS,
    router_1.ROUTER_PROVIDERS,
    index_1.StateService,
    index_1.LogService,
    core_1.provide(ng2_translate_1.TranslateLoader, {
        useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, 'assets/i18n', '.json'); },
        deps: [http_1.Http]
    }),
    ng2_translate_1.TranslateService,
    core_1.provide(index_2.MultilingualService, {
        useFactory: function (translate, win) {
            index_2.MultilingualService.SUPPORTED_LANGUAGES = app_config_service_1.AppConfigService.SUPPORTED_LANGUAGES;
            return new index_2.MultilingualService(translate, win);
        },
        deps: [ng2_translate_1.TranslateService, index_1.WindowService]
    })
];
// scientists
__export(require('./scientists/services/name-list.service'));
// general
__export(require('./services/app-config.service'));
//# sourceMappingURL=index.js.map