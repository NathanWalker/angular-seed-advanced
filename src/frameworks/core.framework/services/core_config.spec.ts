import {t} from '../../test.framework/index';
import {CoreConfig} from '../index';
import * as _ from 'lodash';

export function main() {
  t.describe('core.framework: CoreConfig', () => {
    t.be(() => CoreConfig.RESET());
    
    t.it('PLATFORMS', () => {   
      t.e(_.keys(CoreConfig.PLATFORMS).length).toBe(4);
      t.e(CoreConfig.PLATFORM_TARGET).toBeDefined();
      t.e(CoreConfig.PLATFORMS.WEB).toBe('web');
      t.e(CoreConfig.PLATFORMS.MOBILE_NATIVE).toBe('mobile_native');
      t.e(CoreConfig.PLATFORMS.MOBILE_HYBRID).toBe('mobile_hybrid');
      t.e(CoreConfig.PLATFORMS.DESKTOP).toBe('desktop');
      
      t.e(CoreConfig.IS_WEB).toBeDefined();
      t.e(CoreConfig.IS_MOBILE_NATIVE).toBeDefined();
      t.e(CoreConfig.IS_MOBILE_HYBRID).toBeDefined();
      t.e(CoreConfig.IS_DESKTOP).toBeDefined();
    });
    t.it('ROUTER_DIRECTIVES', () => {
      t.e(CoreConfig.ROUTER_DIRECTIVES).toBeDefined();
    });
    t.it('DEBUG', () => {
      t.e(CoreConfig.DEBUG.LEVEL_1).toBe(false);
      t.e(CoreConfig.DEBUG.LEVEL_2).toBe(false);
      t.e(CoreConfig.DEBUG.LEVEL_3).toBe(false);
      t.e(CoreConfig.DEBUG.LEVEL_4).toBe(false);
    });
  });
}
