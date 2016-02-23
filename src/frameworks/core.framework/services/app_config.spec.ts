import {t} from '../../test.framework/index';
import {AppConfig} from '../index';
import * as _ from 'lodash';

export function main() {
  t.describe('app.framework: AppConfig', () => {
    t.be(() => AppConfig.RESET());
    
    t.it('PLATFORMS', () => {   
      t.e(_.keys(AppConfig.PLATFORMS).length).toBe(4);
      t.e(AppConfig.PLATFORM_TARGET).toBe(AppConfig.PLATFORMS.WEB);
      t.e(AppConfig.PLATFORMS.WEB).toBe('web');
      t.e(AppConfig.PLATFORMS.MOBILE_NATIVE).toBe('mobile_native');
      t.e(AppConfig.PLATFORMS.MOBILE_HYBRID).toBe('mobile_hybrid');
      t.e(AppConfig.PLATFORMS.DESKTOP).toBe('desktop');
    });
    t.it('DEBUG', () => {
      t.e(AppConfig.DEBUG.LEVEL_1).toBe(false);
      t.e(AppConfig.DEBUG.LEVEL_2).toBe(false);
      t.e(AppConfig.DEBUG.LEVEL_3).toBe(false);
      t.e(AppConfig.DEBUG.LEVEL_4).toBe(false);
    });
    t.it('SUPPORTED_LANGUAGES', () => {
      t.e(AppConfig.SUPPORTED_LANGUAGES.length).toBe(5);
      t.e(AppConfig.SUPPORTED_LANGUAGES[0].code).toBe('en');
      t.e(AppConfig.SUPPORTED_LANGUAGES[1].code).toBe('es');
      t.e(AppConfig.SUPPORTED_LANGUAGES[2].code).toBe('fr');
      t.e(AppConfig.SUPPORTED_LANGUAGES[3].code).toBe('ru');
      t.e(AppConfig.SUPPORTED_LANGUAGES[4].code).toBe('bg');
    });
  });
}
