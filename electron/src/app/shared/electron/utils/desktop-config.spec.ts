import { t } from '../../test/index';
import { DesktopConfig } from './desktop-config';

export function main() {
  t.describe('electron: DesktopConfig', () => {

    t.it('SUPPORTED_LANGUAGES', () => {
      t.e(DesktopConfig.SUPPORTED_LANGUAGES.length).toBe(5);
      t.e(DesktopConfig.SUPPORTED_LANGUAGES[0].code).toBe('en');
      t.e(DesktopConfig.SUPPORTED_LANGUAGES[1].code).toBe('es');
      t.e(DesktopConfig.SUPPORTED_LANGUAGES[2].code).toBe('fr');
      t.e(DesktopConfig.SUPPORTED_LANGUAGES[3].code).toBe('ru');
      t.e(DesktopConfig.SUPPORTED_LANGUAGES[4].code).toBe('bg');
    });
  });
}
