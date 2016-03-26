// libs
import {provideStore, Store} from '@ngrx/store';

import {t, TEST_COMMON_PROVIDERS, TEST_ROUTER_PROVIDERS, TEST_MULTILINGUAL_PROVIDERS, TEST_MULTILINGUAL_RESET, WindowMockFrench} from '../../test.framework/index';
import {ILang} from '../../core.framework/index';
import {MultilingualService, MultilingualStateI, multilingualReducer} from '../index';

export function main() {
  t.describe('i18n.framework: MultilingualService', () => {
    t.bep(() => [
      TEST_COMMON_PROVIDERS(),
      TEST_ROUTER_PROVIDERS(),
      TEST_MULTILINGUAL_PROVIDERS(),
      provideStore({i18n: multilingualReducer})
    ]);
    t.it('should at a minimum support english', () => {
      t.e(MultilingualService.SUPPORTED_LANGUAGES.length).toBe(1);
      t.e(MultilingualService.SUPPORTED_LANGUAGES[0].code).toBe('en');
    });
    t.it('changeLang - should not switch unless supported', t.inject([MultilingualService, Store], (multilang: MultilingualService, store: Store<any>) => {
      multilang.changeLang('fr');
      // only 'en' supported by default so changing to 'fr' should not change state
      store.select('i18n').subscribe((i18n: MultilingualStateI) => {
        t.e(i18n.lang).toBe('en');
      });
    }));

  });

  t.describe('i18n.framework: MultilingualService for French browser/platform', () => {
    const SUPPORTED_LANGUAGES: Array<ILang> = [
      { code: 'en', title: 'English' },
      { code: 'fr', title: 'French' }
    ];
    t.be(() => MultilingualService.SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES);
    t.bep(() => [
      TEST_COMMON_PROVIDERS({ Window: WindowMockFrench }),
      TEST_ROUTER_PROVIDERS(),
      TEST_MULTILINGUAL_PROVIDERS(),
      provideStore({i18n: multilingualReducer})
    ]);
    t.it('should now support french by default', t.inject([MultilingualService, Store], (multilang: MultilingualService, store: Store<any>) => {
      store.select('i18n').subscribe((i18n: MultilingualStateI) => {
        t.e(i18n.lang).toBe('fr');
      });
      t.e(MultilingualService.SUPPORTED_LANGUAGES.length).toBe(2);
      t.e(MultilingualService.SUPPORTED_LANGUAGES[0].code).toBe('en');
      t.e(MultilingualService.SUPPORTED_LANGUAGES[1].code).toBe('fr');
    }));

    // ensure statics are reset when the test had modified statics in a beforeEach (be) or beforeEachProvider (bep)
    t.ae(() => TEST_MULTILINGUAL_RESET());       
   
  });

}
