"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// angular
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var router_1 = require('angular2/router');
var location_mock_1 = require('angular2/src/mock/location_mock');
var router_2 = require('angular2/src/router/router');
// 3rd party dependencies
var ng2_translate_1 = require('ng2-translate/ng2-translate');
// app
var index_1 = require('../core.framework/index');
var index_2 = require('../i18n.framework/index');
// mocks
var window_mock_1 = require('./core/mocks/window.mock');
var ng2_translate_mock_1 = require('./libs/ng2-translate/ng2-translate.mock');
// convenient shorthand 
var ng2_jasmine_1 = require('./shorthand/ng2-jasmine');
exports.t = ng2_jasmine_1.Ng2Jasmine;
/*
** PROVIDERS
*/
// common
function TEST_COMMON_PROVIDERS(options) {
    // options:
    // Window: token = custom window mock (mainly for changing out language)
    var providers = [
        index_1.StateService,
        index_1.LogService,
        core_1.provide(index_1.ConsoleService, { useValue: console }),
        core_1.provide(index_1.WindowService, { useClass: (options && options.Window) || window_mock_1.WindowMock }),
        core_1.provide(ng2_translate_1.TranslateService, { useClass: ng2_translate_mock_1.TranslateMock })
    ];
    return providers;
}
exports.TEST_COMMON_PROVIDERS = TEST_COMMON_PROVIDERS;
// component
function TEST_COMPONENT_PROVIDERS(options) {
    // options
    // http:            boolean = HTTP_PROVIDERS
    // router:          Object = router setup { primary: token } (component to use for ROUTER_PRIMARY_COMPONENT)
    var providers = [
        TEST_COMMON_PROVIDERS(),
        core_1.provide(index_2.MultilingualService, {
            useFactory: function (translate, win) {
                return new index_2.MultilingualService(translate, win);
            },
            deps: [ng2_translate_1.TranslateService, index_1.WindowService]
        })
    ];
    if (options) {
        if (options.http) {
            providers.push(http_1.HTTP_PROVIDERS);
        }
        if (options.router) {
            providers.push.apply(providers, [
                router_1.RouteRegistry,
                core_1.provide(router_1.Location, { useClass: location_mock_1.SpyLocation }),
                core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: options.router.primary }),
                core_1.provide(router_1.Router, { useClass: router_2.RootRouter })
            ]);
        }
    }
    return providers;
}
exports.TEST_COMPONENT_PROVIDERS = TEST_COMPONENT_PROVIDERS;
// core
__export(require('./core/mocks/window.mock'));
// e2e
__export(require('./e2e/dropdowns'));
// libs
__export(require('./libs/ng2-translate/ng2-translate.mock'));
// shorthand
__export(require('./shorthand/ng2-jasmine'));
//# sourceMappingURL=index.js.map