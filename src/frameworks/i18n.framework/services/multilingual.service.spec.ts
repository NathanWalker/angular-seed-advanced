import {provide} from 'angular2/core';

import {TranslateService} from 'ng2-translate/ng2-translate';

import {t, TEST_COMMON_PROVIDERS, WindowMockFrench} from '../../test.framework/index';
import {ILang, WindowService} from '../../core.framework/index';
import {MultilingualService} from '../index';

export function main() {
  t.describe('i18n.framework: MultilingualService', () => {
    t.bep(() => [
      TEST_COMMON_PROVIDERS(),
      provide(MultilingualService, {
        useFactory: (translate, win) => {
          return new MultilingualService(translate, win);
        },
        deps: [TranslateService, WindowService]
      })
    ]);
    t.it('should get language', t.inject([MultilingualService], (multilang) => {
      t.e(multilang.getLang()).toBe('en');
    }));
    t.it('should at a minimum support english', () => {
      t.e(MultilingualService.SUPPORTED_LANGUAGES[0].code).toBe('en');
    });
    t.it('should default static files loader', () => {
      t.e(MultilingualService.STATIC_FILES_LOADER).toBe('assets/i18n');
    });

  });

  t.describe('i18n.framework: MultilingualService for French and should allow customization of location of i18n files', () => {
    const SUPPORTED_LANGUAGES: Array<ILang> = [
      { code: 'en', title: 'English' },
      { code: 'fr', title: 'French' }
    ];
    t.bep(() => [
      TEST_COMMON_PROVIDERS({ Window: WindowMockFrench}),
      provide(MultilingualService, {
        useFactory: (translate, win) => {
          MultilingualService.SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES;
          MultilingualService.STATIC_FILES_LOADER = 'public/i18n';
          return new MultilingualService(translate, win);
        },
        deps: [TranslateService, WindowService]
      })
    ]);
    t.it('should get language - french', t.inject([MultilingualService], (multilang) => {
      t.e(multilang.getLang()).toBe('fr');
    }));
    t.it('should now support french', () => {
      t.e(MultilingualService.SUPPORTED_LANGUAGES.length).toBe(2);
      t.e(MultilingualService.SUPPORTED_LANGUAGES[0].code).toBe('en');
      t.e(MultilingualService.SUPPORTED_LANGUAGES[1].code).toBe('fr');
      
      if (MultilingualService.SUPPORTED_LANGUAGES.length > 1) {
        // ensure it's reset back to the 1 default
        MultilingualService.SUPPORTED_LANGUAGES.splice(-1);
      }
    });
    t.it('i18n file location should be custom', () => {
      t.e(MultilingualService.STATIC_FILES_LOADER).toBe('public/i18n');
    });
   
  });

}
