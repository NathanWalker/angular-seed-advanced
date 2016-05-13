import {topmost} from 'ui/frame';
import {ActionItem, ActionItems} from 'ui/action-bar';

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
  public static STATUSBAR_STYLE(style: number) {
    if (topmost().ios) {
      let navigationBar = topmost().ios.controller.navigationBar;
      // 0: default
      // 1: light
      navigationBar.barStyle = style;
    }
  }
}
