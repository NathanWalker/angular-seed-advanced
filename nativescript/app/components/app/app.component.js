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
var router_1 = require('angular2/router');
// app
var index_1 = require('../../frameworks/core.framework/index');
var index_2 = require('../../frameworks/i18n.framework/index');
var navbar_component_1 = require('./navbar.component');
var toolbar_component_1 = require('./toolbar.component');
var home_component_1 = require('../home/home.component');
var about_component_1 = require('../about/about.component');
var index_3 = require('../../frameworks/app.framework/index');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        index_1.RouteComponent({
            selector: 'sd-app',
            viewProviders: [index_3.NameListService],
            templateUrl: './components/app/app.component.html',
            directives: [index_2.LangSwitcherComponent, navbar_component_1.NavbarComponent, toolbar_component_1.ToolbarComponent],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        router_1.RouteConfig([
            { path: '/', component: home_component_1.HomeComponent, as: 'Home' },
            { path: '/about', component: about_component_1.AboutComponent, as: 'About' }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map