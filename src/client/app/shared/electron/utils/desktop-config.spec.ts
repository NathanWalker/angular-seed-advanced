import { t } from '../../test/index';
import { DesktopConfig } from './desktop-config';

export function main() {
  t.describe('electron: DesktopConfig', () => {

    t.it('GET_SUPPORTED_LANGUAGES', () => {
      const languages = DesktopConfig.GET_SUPPORTED_LANGUAGES();
      t.e(languages.length).toBe(5);
      t.e(languages[0].code).toBe('en');
      t.e(languages[1].code).toBe('es');
      t.e(languages[2].code).toBe('fr');
      t.e(languages[3].code).toBe('ru');
      t.e(languages[4].code).toBe('bg');
    });
  });
}
