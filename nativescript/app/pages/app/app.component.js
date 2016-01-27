"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var frame_1 = require('ui/frame');
// app
var app_component_1 = require('../../components/app/app.component');
var index_1 = require('../../frameworks/core.framework/index');
var modal_native_service_1 = require('../../shared/core/services/modal-native.service');
var actionbar_util_1 = require('../../shared/core/utils/actionbar.util');
var NSAppComponent = (function (_super) {
    __extends(NSAppComponent, _super);
    function NSAppComponent(log, state, modal) {
        var _this = this;
        _super.call(this);
        this.log = log;
        this.state = state;
        this.modal = modal;
        log.o('NSAppCmp ----');
        // let btn = new ActionItem();
        // btn.icon = 'res://ic_menu';
        // btn.ios.position = 'left';
        // btn.on('tap', this.openMenu.bind(this));
        // ActionBarUtil.ADD_BUTTON(btn);
        actionbar_util_1.ActionBarUtil.STATUSBAR_STYLE(1);
        this.state.change.subscribe(function (msg) {
            _this.log.o("Route change: " + msg);
            switch (msg) {
                case 'Home':
                    actionbar_util_1.ActionBarUtil.SET_TITLE('Angular 2 Seed Advanced');
                    break;
                case 'About':
                    actionbar_util_1.ActionBarUtil.SET_TITLE('About');
                    break;
            }
        });
    }
    NSAppComponent.prototype.openMenu = function () {
        var _this = this;
        this.modal.showModal(frame_1.topmost().currentPage, './pages/menu/menu.component', 'Context', function () {
            _this.log.o("modal closed");
        });
    };
    NSAppComponent = __decorate([
        __param(0, core_1.Inject(index_1.LogService)),
        __param(1, core_1.Inject(index_1.StateService)),
        __param(2, core_1.Inject(modal_native_service_1.ModalNative)), 
        __metadata('design:paramtypes', [index_1.LogService, index_1.StateService, modal_native_service_1.ModalNative])
    ], NSAppComponent);
    return NSAppComponent;
}(app_component_1.AppComponent));
exports.NSAppComponent = NSAppComponent;
//# sourceMappingURL=app.component.js.map