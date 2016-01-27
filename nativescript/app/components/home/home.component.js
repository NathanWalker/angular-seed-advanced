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
var index_2 = require('../../frameworks/app.framework/index');
var HomeComponent = (function () {
    function HomeComponent(nameList, state) {
        this.nameList = nameList;
        this.state = state;
        this.newName = '';
    }
    /*
     * @param newname  any text as input.
     * @returns return false to prevent default form submit behavior to refresh the page.
     */
    HomeComponent.prototype.addName = function () {
        this.nameList.add(this.newName);
        this.newName = '';
        return false;
    };
    HomeComponent.prototype.routerOnActivate = function (nextInstruction, prevInstruction) {
        this.state.routeActivated('Home');
    };
    HomeComponent = __decorate([
        index_1.FormComponent({
            selector: 'sd-home',
            templateUrl: './components/home/home.component.html',
            styleUrls: ['./components/home/home.component.css']
        }), 
        __metadata('design:paramtypes', [index_2.NameListService, index_1.StateService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map