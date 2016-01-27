"use strict";
// angular
var core_1 = require('angular2/core');
// libs
var ng2_translate_1 = require('ng2-translate/ng2-translate');
// app
var index_1 = require('../index');
var _reflect = Reflect;
var DecoratorUtils = (function () {
    function DecoratorUtils() {
    }
    DecoratorUtils.getConfig = function (config, opts) {
        if (config === void 0) { config = {}; }
        // default directives
        var DIRECTIVES = [];
        // default pipes
        var PIPES = [ng2_translate_1.TranslatePipe];
        // custom decorator options
        if (opts) {
            if (opts.directives) {
                DIRECTIVES.push.apply(DIRECTIVES, opts.directives);
            }
            if (opts.pipes) {
                PIPES.push.apply(PIPES, opts.pipes);
            }
        }
        if (config.templateUrl) {
            // correct view for platform target
            config.templateUrl = index_1.ViewBrokerService.TEMPLATE_URL(config.templateUrl);
        }
        if (config.styleUrls && index_1.CoreConfigService.IS_MOBILE_NATIVE()) {
            // {N} doesn't support all css properties, therefore remove styleUrls to be safe
            delete config.styleUrls;
        }
        config.directives = config.directives ? config.directives.concat(DIRECTIVES) : DIRECTIVES;
        config.pipes = config.pipes ? config.pipes.concat(PIPES) : PIPES;
        config.host = config.host || {};
        if (config.encapsulation) {
            config.encapsulation = config.encapsulation;
        }
        // initialize anything 
        if (config.init) {
            config.init();
        }
        return config;
    };
    DecoratorUtils.annotateComponent = function (cls, config, opts) {
        if (config === void 0) { config = {}; }
        var annotations = _reflect.getMetadata('annotations', cls) || [];
        annotations.push(new core_1.Component(DecoratorUtils.getConfig(config, opts)));
        _reflect.defineMetadata('annotations', annotations, cls);
        return cls;
    };
    return DecoratorUtils;
}());
exports.DecoratorUtils = DecoratorUtils;
//# sourceMappingURL=utils.js.map