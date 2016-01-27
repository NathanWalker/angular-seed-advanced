"use strict";
var index_1 = require('../../../src/frameworks/test.framework/index');
var nativescript_config_1 = require('./nativescript-config');
function main() {
    index_1.t.describe('nativescript.framework: NativeScriptConfig', function () {
        index_1.t.it('sanity', function () {
            index_1.t.e(nativescript_config_1.NativeScriptConfig.PAGE).toBeUndefined();
        });
    });
}
exports.main = main;
//# sourceMappingURL=nativescript-config.spec.js.map