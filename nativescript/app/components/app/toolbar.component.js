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
// app
var index_1 = require('../../frameworks/core.framework/index');
var index_2 = require('../../frameworks/i18n.framework/index');
var navbar_component_1 = require('./navbar.component');
var ToolbarComponent = (function () {
    function ToolbarComponent(log) {
        this.log = log;
    }
    ToolbarComponent.prototype.openLanguages = function (e) {
        this.log.o('openLanguages');
    };
    ToolbarComponent = __decorate([
        index_1.BaseComponent({
            selector: 'sd-toolbar',
            templateUrl: './components/app/toolbar.component.html',
            styleUrls: ['./components/app/toolbar.component.css'],
            directives: [index_2.LangSwitcherComponent, navbar_component_1.NavbarComponent]
        }), 
        __metadata('design:paramtypes', [index_1.LogService])
    ], ToolbarComponent);
    return ToolbarComponent;
}());
exports.ToolbarComponent = ToolbarComponent;
//# sourceMappingURL=toolbar.component.js.map