"use strict";
// angular
var router_1 = require('angular2/router');
var CoreConfigService = (function () {
    function CoreConfigService() {
    }
    // convenient platform checks
    CoreConfigService.IS_WEB = function () {
        return CoreConfigService.PLATFORM_TARGET === CoreConfigService.PLATFORMS.WEB;
    };
    CoreConfigService.IS_MOBILE_NATIVE = function () {
        return CoreConfigService.PLATFORM_TARGET === CoreConfigService.PLATFORMS.MOBILE_NATIVE;
    };
    CoreConfigService.IS_MOBILE_HYBRID = function () {
        return CoreConfigService.PLATFORM_TARGET === CoreConfigService.PLATFORMS.MOBILE_HYBRID;
    };
    CoreConfigService.IS_DESKTOP = function () {
        return CoreConfigService.PLATFORM_TARGET === CoreConfigService.PLATFORMS.DESKTOP;
    };
    // reset debug defaults
    CoreConfigService.RESET = function () {
        for (var key in CoreConfigService.DEBUG) {
            CoreConfigService.DEBUG[key] = false;
        }
    };
    CoreConfigService.DEBUG = {
        LEVEL_1: false,
        LEVEL_2: false,
        LEVEL_3: false,
        LEVEL_4: false // .log + all the above
    };
    // allows runtime config of platform specific router directives
    CoreConfigService.ROUTER_DIRECTIVES = router_1.ROUTER_DIRECTIVES;
    // supported platforms
    CoreConfigService.PLATFORMS = {
        WEB: 'web',
        MOBILE_NATIVE: 'mobile_native',
        MOBILE_HYBRID: 'mobile_hybrid',
        DESKTOP: 'desktop'
    };
    // current target (defaults to web)
    CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.WEB;
    return CoreConfigService;
}());
exports.CoreConfigService = CoreConfigService;
//# sourceMappingURL=core-config.service.js.map