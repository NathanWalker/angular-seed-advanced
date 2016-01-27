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
// nativescript
var frame_1 = require('ui/frame');
// app
var index_1 = require('../../frameworks/core.framework/index');
var MenuModal = (function () {
    function MenuModal(log) {
        var _this = this;
        this.log = log;
        frame_1.topmost().currentPage.on('showingModally', function (args) {
            _this.log.o("showingModally");
            var modalPage = args.object;
            if (modalPage.ios && modalPage.ios.modalPresentationStyle === UIModalPresentationStyle.UIModalPresentationFullScreen) {
                _this.log.o("Setting modalPage.ios.modalPresentationStyle to UIModalPresentationStyle.UIModalPresentationOverFullScreen");
                modalPage.ios.modalPresentationStyle = UIModalPresentationStyle.UIModalPresentationOverFullScreen;
            }
        });
        frame_1.topmost().currentPage.on('showingModally', function (args) {
            _this.log.o("showingModally");
            _this.closeCallback = args.closeCallback;
            var modalPage = args.object;
            if (frame_1.topmost().currentPage.modal !== args.object) {
                throw new Error("frame.topmost().currentPage.modal.id: " + frame_1.topmost().currentPage.modal.id + "; modalPage.id: " + modalPage.id);
            }
        });
    }
    MenuModal.prototype.modalClose = function () {
        this.log.o("modalClose");
        if (this.closeCallback) {
            this.closeCallback();
        }
        else {
            frame_1.topmost().goBack();
        }
    };
    MenuModal = __decorate([
        core_1.Component({
            selector: 'menu-modal',
            template: "\n  <StackLayout>\n    <Label text=\"Modal View\"></Label>\n    <Button text=\"Close\" (tap)=\"modalClose\"></Button>\n  </StackLayout>\n  "
        }), 
        __metadata('design:paramtypes', [index_1.LogService])
    ], MenuModal);
    return MenuModal;
}());
exports.MenuModal = MenuModal;
//# sourceMappingURL=menu.component.js.map