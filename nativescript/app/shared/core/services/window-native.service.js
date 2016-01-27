"use strict";
// nativescript
var dialogs = require('ui/dialogs');
var WindowNative = (function () {
    function WindowNative() {
    }
    Object.defineProperty(WindowNative.prototype, "navigator", {
        get: function () {
            return {
                language: 'en-US'
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowNative.prototype, "location", {
        get: function () {
            return {
                host: 'nativescript'
            };
        },
        enumerable: true,
        configurable: true
    });
    WindowNative.prototype.alert = function (msg) {
        return dialogs.alert(msg);
    };
    WindowNative.prototype.confirm = function (msg) {
        return dialogs.confirm(msg);
    };
    return WindowNative;
}());
exports.WindowNative = WindowNative;
//# sourceMappingURL=window-native.service.js.map