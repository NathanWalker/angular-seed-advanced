// libs
import * as _ from 'lodash';

// app
import { t } from '../../test/index';

// module
import { Config } from './config';

export function main() {
  t.describe('core: Config', () => {
    t.be(() => Config.RESET());

    t.it('ENVIRONMENT', () => {
      t.e(Config.ENVIRONMENT).toBeDefined();
    });
    t.it('PLATFORMS', () => {
      t.e(_.keys(Config.PLATFORMS).length).toBe(4);
      t.e(Config.PLATFORM_TARGET).toBeDefined();
      t.e(Config.PLATFORMS.WEB).toBe('web');
      t.e(Config.PLATFORMS.MOBILE_NATIVE).toBe('mobile_native');
      t.e(Config.PLATFORMS.MOBILE_HYBRID).toBe('mobile_hybrid');
      t.e(Config.PLATFORMS.DESKTOP).toBe('desktop');

      t.e(Config.IS_WEB).toBeDefined();
      t.e(Config.IS_MOBILE_NATIVE).toBeDefined();
      t.e(Config.IS_MOBILE_HYBRID).toBeDefined();
      t.e(Config.IS_DESKTOP).toBeDefined();
    });
    t.it('DEBUG', () => {
      t.e(Config.DEBUG.LEVEL_1).toBe(false);
      t.e(Config.DEBUG.LEVEL_2).toBe(false);
      t.e(Config.DEBUG.LEVEL_3).toBe(false);
      t.e(Config.DEBUG.LEVEL_4).toBe(false);
      t.e(Config.IS_DEBUG_MODE()).toBe(false);
    });
  });
}
