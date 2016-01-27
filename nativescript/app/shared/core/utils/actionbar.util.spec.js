"use strict";
var index_1 = require('../../../../../src/frameworks/test.framework/index');
var actionbar_util_1 = require('./actionbar.util');
function main() {
    index_1.t.describe('nativescript.framework: ActionBarUtil', function () {
        index_1.t.it('sanity', function () {
            index_1.t.e(actionbar_util_1.ActionBarUtil.SET_TITLE).toBeDefined();
            index_1.t.e(actionbar_util_1.ActionBarUtil.ADD_BUTTON).toBeDefined();
            index_1.t.e(actionbar_util_1.ActionBarUtil.EMPTY_ITEMS).toBeDefined();
            index_1.t.e(actionbar_util_1.ActionBarUtil.STATUSBAR_STYLE).toBeDefined();
        });
    });
}
exports.main = main;
//# sourceMappingURL=actionbar.util.spec.js.map