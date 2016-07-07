import {t} from '../../test/index';
import {AppConfigService} from './app-config.service';

export function main() {
  t.describe('app: AppConfigService', () => {
    
    t.it('SUPPORTED_LANGUAGES', () => {
      t.e(AppConfigService.SUPPORTED_LANGUAGES.length).toBe(5);
      t.e(AppConfigService.SUPPORTED_LANGUAGES[0].code).toBe('en');
      t.e(AppConfigService.SUPPORTED_LANGUAGES[1].code).toBe('es');
      t.e(AppConfigService.SUPPORTED_LANGUAGES[2].code).toBe('fr');
      t.e(AppConfigService.SUPPORTED_LANGUAGES[3].code).toBe('ru');
      t.e(AppConfigService.SUPPORTED_LANGUAGES[4].code).toBe('bg');
    });
  });
}
