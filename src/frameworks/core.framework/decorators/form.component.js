"use strict";
var utils_1 = require('./utils');
var common_1 = require('angular2/common');
function FormComponent(config) {
    if (config === void 0) { config = {}; }
    return function (cls) {
        return utils_1.DecoratorUtils.annotateComponent(cls, config, {
            directives: common_1.FORM_DIRECTIVES
        });
    };
}
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map