"use strict";
var core_config_service_1 = require('../services/core-config.service');
var utils_1 = require('./utils');
function RouteComponent(config) {
    if (config === void 0) { config = {}; }
    return function (cls) {
        return utils_1.DecoratorUtils.annotateComponent(cls, config, {
            directives: core_config_service_1.CoreConfigService.ROUTER_DIRECTIVES
        });
    };
}
exports.RouteComponent = RouteComponent;
//# sourceMappingURL=route.component.js.map