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
var common_1 = require('angular2/common');
// libs
var ng2_translate_1 = require('ng2-translate/ng2-translate');
// app
var index_1 = require('../../core.framework/index');
var index_2 = require('../index');
var LangSwitcherComponent = (function () {
    function LangSwitcherComponent(translate, multilang, log) {
        this.translate = translate;
        this.multilang = multilang;
        this.log = log;
        this.supportedLanguages = index_2.MultilingualService.SUPPORTED_LANGUAGES;
        this.langForm = new common_1.ControlGroup({
            lang: new common_1.Control(multilang.getLang())
        });
    }
    LangSwitcherComponent.prototype.changeLang = function (e) {
        var lang = this.supportedLanguages[0].code; // fallback to default 'en'
        if (index_1.CoreConfigService.IS_MOBILE_NATIVE()) {
            if (e) {
                lang = this.supportedLanguages[e.newIndex].code;
            }
        }
        else {
            lang = this.langForm.value.lang;
        }
        this.log.o("Language change: " + lang);
        this.translate.use(lang);
    };
    LangSwitcherComponent = __decorate([
        index_1.FormComponent({
            selector: 'lang-switcher',
            templateUrl: './frameworks/i18n.framework/components/lang-switcher.component.html'
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, index_2.MultilingualService, index_1.LogService])
    ], LangSwitcherComponent);
    return LangSwitcherComponent;
}());
exports.LangSwitcherComponent = LangSwitcherComponent;
//# sourceMappingURL=lang-switcher.component.js.map