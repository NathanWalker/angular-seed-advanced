import { t } from '../../../app/frameworks/test/index';
import { ActionBarUtil } from './actionbar.util';

export function main() {
  t.describe('nativescript: ActionBarUtil', () => {

    t.it('sanity', () => {
      t.e(ActionBarUtil.SET_TITLE).toBeDefined();
      t.e(ActionBarUtil.ADD_BUTTON).toBeDefined();
      t.e(ActionBarUtil.EMPTY_ITEMS).toBeDefined();
      t.e(ActionBarUtil.STATUSBAR_STYLE).toBeDefined();
    });
  });
}
