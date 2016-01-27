"use strict";
var core_1 = require('angular2/core');
var Observable_1 = require('rxjs/Observable');
var TranslateMock = (function () {
    function TranslateMock() {
        this.onLangChange = new core_1.EventEmitter();
    }
    TranslateMock.prototype.getTranslation = function (lang) {
        return {
            'TEST': 'test'
        };
    };
    TranslateMock.prototype.use = function (lang) {
        // console.log(lang);
    };
    TranslateMock.prototype.useStaticFilesLoader = function (path) {
        // console.log(path);
    };
    TranslateMock.prototype.get = function (key, interpolateParams) {
        return Observable_1.Observable.of(key);
    };
    return TranslateMock;
}());
exports.TranslateMock = TranslateMock;
//# sourceMappingURL=ng2-translate.mock.js.map