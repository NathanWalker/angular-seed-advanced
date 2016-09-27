import { t } from '../../test/index';
import { AppConfig } from './app-config';

export function main() {
  t.describe('app: AppConfig', () => {
    
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
