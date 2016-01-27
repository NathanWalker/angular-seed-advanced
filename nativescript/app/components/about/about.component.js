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
var index_1 = require('../../frameworks/core.framework/index');
var AboutComponent = (function () {
    function AboutComponent(state) {
        this.state = state;
    }
    AboutComponent.prototype.routerOnActivate = function (nextInstruction, prevInstruction) {
        this.state.routeActivated('About');
    };
    AboutComponent = __decorate([
        index_1.BaseComponent({
            selector: 'sd-about',
            templateUrl: './components/about/about.component.html',
            styleUrls: ['./components/about/about.component.css']
        }), 
        __metadata('design:paramtypes', [index_1.StateService])
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map