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
// angular
var core_1 = require('angular2/core');
// libs
var _ = require('lodash');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
// app
var index_1 = require('../../core.framework/index');
var MultilingualService = (function () {
    function MultilingualService(translate, win) {
        this.translate = translate;
        this.win = win;
        // defaults to English: 'en'
        this._userLang = 'en';
        // use navigator lang if available
        var userLang = win.navigator.language.split('-')[0];
        if (_.includes(_.map(MultilingualService.SUPPORTED_LANGUAGES, 'code'), userLang)) {
            // only if supported
            this._userLang = userLang;
        }
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);
    }
    MultilingualService.prototype.getLang = function () {
        return this._userLang;
    };
    // default supported languages
    // see main.ts bootstrap for example of how to provide different value
    MultilingualService.SUPPORTED_LANGUAGES = [
        { code: 'en', title: 'English' }
    ];
    MultilingualService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, index_1.WindowService])
    ], MultilingualService);
    return MultilingualService;
}());
exports.MultilingualService = MultilingualService;
//# sourceMappingURL=multilingual.service.js.map