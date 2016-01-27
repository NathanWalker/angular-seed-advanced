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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// angular
var core_1 = require('angular2/core');
// nativescript
var file_system_1 = require('file-system');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/fromPromise');
var NSMultilingualLoader = (function () {
    function NSMultilingualLoader(prefix, suffix) {
        this._loaderParams = { prefix: 'i18n', suffix: '.json' };
        this.configure(prefix, suffix);
    }
    NSMultilingualLoader.prototype.configure = function (prefix, suffix) {
        this._loaderParams.prefix = prefix ? prefix : this._loaderParams.prefix;
        this._loaderParams.suffix = suffix ? suffix : this._loaderParams.suffix;
    };
    NSMultilingualLoader.prototype.getTranslation = function (lang) {
        var _this = this;
        if (this._currentLang !== lang) {
            this._currentLang = lang;
            var app = file_system_1.knownFolders.currentApp();
            var locale_1 = app.getFile(this._loaderParams.prefix + "/" + lang + this._loaderParams.suffix);
            return Observable_1.Observable.fromPromise(new Promise(function (resolve, reject) {
                locale_1.readText().then(function (data) {
                    try {
                        _this._currentTranslation = JSON.parse(data);
                        resolve(_this._currentTranslation);
                    }
                    catch (err) {
                        throw new Error('Error parsing locale JSON file.');
                        reject(err);
                    }
                }, function (err) {
                    throw new Error('Error reading locale file.');
                    reject(err);
                });
            }));
        }
        else {
            return Observable_1.Observable.of(this._currentTranslation);
        }
    };
    NSMultilingualLoader = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [String, String])
    ], NSMultilingualLoader);
    return NSMultilingualLoader;
}());
exports.NSMultilingualLoader = NSMultilingualLoader;
//# sourceMappingURL=ng2-translate-loader.service.js.map