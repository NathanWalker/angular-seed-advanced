"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var index_1 = require('../index');
var LogService = (function () {
    function LogService(logger) {
        this.logger = logger;
    }
    // out
    LogService.prototype.o = function (msg) {
        if (index_1.CoreConfigService.DEBUG.LEVEL_4) {
            this.logger.log(msg);
        }
    };
    // error
    LogService.prototype.error = function (err) {
        if (index_1.CoreConfigService.DEBUG.LEVEL_4 || index_1.CoreConfigService.DEBUG.LEVEL_3) {
            this.logger.error(err);
        }
    };
    // warn
    LogService.prototype.warn = function (err) {
        if (index_1.CoreConfigService.DEBUG.LEVEL_4 || index_1.CoreConfigService.DEBUG.LEVEL_2) {
            this.logger.warn(err);
        }
    };
    // info
    LogService.prototype.info = function (err) {
        if (index_1.CoreConfigService.DEBUG.LEVEL_4 || index_1.CoreConfigService.DEBUG.LEVEL_1) {
            this.logger.info(err);
        }
    };
    LogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.ConsoleService])
    ], LogService);
    return LogService;
}());
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map