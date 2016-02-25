import {topmost} from 'ui/frame';
import {ActionItem} from 'ui/action-bar';

declare var UIBarStyle: any;

export class ActionBarUtil {
  public static SET_TITLE(title: string) {
    var actionBar = topmost().currentPage.actionBar;
    actionBar.title = title;
  }
  public static ADD_BUTTON(button: ActionItem) {
    topmost().currentPage.actionBar.actionItems.addItem(button);
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
      switch (style) {
        case 0:
          navigationBar.barStyle = UIBarStyle.UIBarStyleDefault;
          break;
        case 1:
          navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
          break;
      }
    }
  }
}
