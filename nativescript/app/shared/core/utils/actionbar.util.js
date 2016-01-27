"use strict";
var frame_1 = require('ui/frame');
var ActionBarUtil = (function () {
    function ActionBarUtil() {
    }
    ActionBarUtil.SET_TITLE = function (title) {
        var actionBar = frame_1.topmost().currentPage.actionBar;
        actionBar.title = title;
    };
    ActionBarUtil.ADD_BUTTON = function (button) {
        // NOTE: This MUST be called BEFORE SET_TITLE on start
        frame_1.topmost().currentPage.actionBar.actionItems.addItem(button);
    };
    ActionBarUtil.HIDE_BACK_BUTTON = function () {
        if (frame_1.topmost().ios) {
            frame_1.topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
        }
    };
    ActionBarUtil.EMPTY_ITEMS = function () {
        var actionBar = frame_1.topmost().currentPage.actionBar;
        var actionItems = actionBar.actionItems.getItems();
        actionItems.forEach(function (item) {
            actionBar.actionItems.removeItem(item);
        });
    };
    ActionBarUtil.STATUSBAR_STYLE = function (style) {
        if (frame_1.topmost().ios) {
            var navigationBar = frame_1.topmost().ios.controller.navigationBar;
            // 0: default
            // 1: light
            navigationBar.barStyle = style;
        }
    };
    return ActionBarUtil;
}());
exports.ActionBarUtil = ActionBarUtil;
//# sourceMappingURL=actionbar.util.js.map