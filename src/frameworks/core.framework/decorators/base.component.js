"use strict";
var utils_1 = require('./utils');
function BaseComponent(config) {
    if (config === void 0) { config = {}; }
    return function (cls) {
        return utils_1.DecoratorUtils.annotateComponent(cls, config);
    };
}
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map