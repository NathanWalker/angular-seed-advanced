"use strict";
// angular
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
// libs
var ng2_translate_1 = require('ng2-translate/ng2-translate');
// app
var index_1 = require('../core.framework/index');
var index_2 = require('../app.framework/index');
var index_3 = require('../i18n.framework/index');
exports.NS_APP_PROVIDERS = [
    http_1.HTTP_PROVIDERS,
    index_1.StateService,
    core_1.provide(index_1.ConsoleService, { useValue: console }),
    index_1.LogService,
    ng2_translate_1.TranslateService,
    core_1.provide(index_3.MultilingualService, {
        useFactory: function (translate, win) {
            index_3.MultilingualService.SUPPORTED_LANGUAGES = index_2.AppConfigService.SUPPORTED_LANGUAGES;
            return new index_3.MultilingualService(translate, win);
        },
        deps: [ng2_translate_1.TranslateService, index_1.WindowService]
    })
];
//# sourceMappingURL=index.js.map