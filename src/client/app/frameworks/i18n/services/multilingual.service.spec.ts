// libs
import {provideStore, Store} from '@ngrx/store';

import {t} from '../../test/index';
// import {TEST_CORE_PROVIDERS, TEST_HTTP_PROVIDERS, TEST_ROUTER_PROVIDERS, WindowMockFrench} from '../../core/testing/index';
import {TEST_CORE_PROVIDERS, TEST_HTTP_PROVIDERS, TEST_ROUTER_PROVIDERS} from '../../core/testing/index';
// import {TEST_MULTILINGUAL_PROVIDERS, TEST_MULTILINGUAL_RESET} from '../testing/index';
import {TEST_MULTILINGUAL_PROVIDERS} from '../testing/index';
// import {ILang, WindowService} from '../../core/index';
import {MultilingualService, MultilingualStateI, multilingualReducer} from '../index';

export function main() {
  t.describe('i18n:', () => {
    t.describe('MultilingualService', () => {
      t.bep(() => [
        TEST_CORE_PROVIDERS(),
        TEST_HTTP_PROVIDERS(),
        TEST_ROUTER_PROVIDERS(),
        TEST_MULTILINGUAL_PROVIDERS(),
        provideStore({ i18n: multilingualReducer })
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

    // disabled at moment due to some async creation of providers
    // used to work pre-rc.1 - will revisit later
    // what this test actually covers works fine - it's just the testing setup that is not right at moment
    // if you isolate this with `t.ddescribe`, it passes
    // only issue when run with all other tests
    // if someone knows why, a PR would be appreciated!
    // t.describe('MultilingualService for French browser/platform', () => {
    //   const SUPPORTED_LANGUAGES: Array<ILang> = [
    //     { code: 'en', title: 'English' },
    //     { code: 'fr', title: 'French' }
    //   ];
    //   t.be(() => MultilingualService.SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES);
    //   t.bep(() => [
    //     TEST_CORE_PROVIDERS({ window: WindowMockFrench }),
    //     TEST_HTTP_PROVIDERS(),
    //     TEST_ROUTER_PROVIDERS(),
    //     TEST_MULTILINGUAL_PROVIDERS(),
    //     provideStore({ i18n: multilingualReducer })
    //   ]);
    //   // ensure statics are reset when the test had modified statics in a beforeEach (be) or beforeEachProvider (bep)
    //   t.ae(() => TEST_MULTILINGUAL_RESET());  
      
    //   t.it('should now support french by default', t.inject([MultilingualService, Store, WindowService], (multilang: MultilingualService, store: Store<any>, win: WindowService) => {
    //     t.e(MultilingualService.SUPPORTED_LANGUAGES.length).toBe(2);
    //     t.e(MultilingualService.SUPPORTED_LANGUAGES[0].code).toBe('en');
    //     t.e(MultilingualService.SUPPORTED_LANGUAGES[1].code).toBe('fr');
    //     t.e(win.navigator.language).toBe('fr-US');

    //     store.select('i18n').subscribe((i18n: MultilingualStateI) => {
    //       t.e(i18n.lang).toBe('fr');
    //     });
    //   }));     
    
    // });
  });

}
