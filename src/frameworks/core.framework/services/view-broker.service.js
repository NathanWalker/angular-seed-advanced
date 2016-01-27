"use strict";
var core_config_service_1 = require('./core-config.service');
var ViewBrokerService = (function () {
    function ViewBrokerService() {
    }
    ViewBrokerService.TEMPLATE_URL = function (path) {
        if (core_config_service_1.CoreConfigService.IS_WEB()) {
            return path;
        }
        else if (core_config_service_1.CoreConfigService.IS_MOBILE_NATIVE()) {
            // views for native should all come from ./frameworks/nativescript.framework
            path = path.slice(1); // remove leading '.'
            return "./frameworks/nativescript.framework" + path;
        }
        else if (core_config_service_1.CoreConfigService.IS_MOBILE_HYBRID()) {
            return path;
        }
        else if (core_config_service_1.CoreConfigService.IS_DESKTOP()) {
            return path;
        }
    };
    return ViewBrokerService;
}());
exports.ViewBrokerService = ViewBrokerService;
//# sourceMappingURL=view-broker.service.js.map