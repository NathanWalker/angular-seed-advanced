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
var NavbarComponent = (function () {
    function NavbarComponent(log, state) {
        var _this = this;
        this.log = log;
        this.state = state;
        // TODO: this is a hack to get {N} active route links to work
        this.activeLink = {
            home: true,
            about: false
        };
        state.change.subscribe(function (msg) {
            switch (msg) {
                case 'Home':
                    _this.activeLink.home = true;
                    _this.activeLink.about = false;
                    break;
                case 'About':
                    _this.activeLink.home = false;
                    _this.activeLink.about = true;
                    break;
            }
        });
    }
    NavbarComponent = __decorate([
        index_1.RouteComponent({
            selector: 'sd-navbar',
            templateUrl: './components/app/navbar.component.html',
            styleUrls: ['./components/app/navbar.component.css']
        }), 
        __metadata('design:paramtypes', [index_1.LogService, index_1.StateService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map