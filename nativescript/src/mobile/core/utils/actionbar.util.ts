import { topmost } from 'ui/frame';
import { ActionItem, ActionItems } from 'ui/action-bar';
import * as app from 'application';
import { device, isAndroid } from 'platform';
import { Color } from 'color';
declare var android;

declare var UIBarStyle: any;

export class ActionBarUtil {
  public static SET_TITLE(title: string) {
    var actionBar = topmost().currentPage.actionBar;
    actionBar.title = title;
  }
  public static ADD_BUTTON(button: ActionItem) {
    // NOTE: This MUST be called BEFORE SET_TITLE on start
    topmost().currentPage.actionBar.actionItems.addItem(button);
  }
  public static HIDE_BACK_BUTTON() {
    if (topmost().ios) {
      topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
    }
  }
  public static EMPTY_ITEMS() {
    var actionBar = topmost().currentPage.actionBar;
    var actionItems = actionBar.actionItems.getItems();
    actionItems.forEach((item) => {
      actionBar.actionItems.removeItem(item);
    });
  }
  public static STATUSBAR_STYLE(style: number | string) {
    if (topmost().ios) {
      let navigationBar = topmost().ios.controller.navigationBar;
      // 0: default
      // 1: light
      navigationBar.barStyle = style;
    } else if (isAndroid) {
      if (app.android && device.sdkVersion >= '21') {
        try {
          let LayoutParams = <any>android.view.WindowManager.LayoutParams;
          let win: any;
          if (app.android.foregroundActivity) {
            win = app.android.foregroundActivity.getWindow();
          } else {
            win = app.android.startActivity.getWindow();
          }

          win.addFlags(LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
          win.setStatusBarColor(new Color(<string>style || '#3280CF').android);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}
