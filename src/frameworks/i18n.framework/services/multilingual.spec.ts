import {provide} from 'angular2/core';

import {TranslateService} from 'ng2-translate/ng2-translate';

import {t, TEST_COMMON_PROVIDERS, WindowMockFrench} from '../../test.framework/index';
import {ILang, Window} from '../../core.framework/index';
import {Multilingual} from '../index';

export function main() {
  t.describe('app.framework: Multilingual', () => {
    t.bep(() => [
      TEST_COMMON_PROVIDERS(),
      provide(Multilingual, {
        useFactory: (translate, win) => {
          return new Multilingual(translate, win);
        },
        deps: [TranslateService, Window]
      })
    ]);
    t.it('should get language', t.inject([Multilingual], (multilang) => {
      t.e(multilang.getLang()).toBe('en');
    }));
    t.it('should at a minimum support english', t.inject([Multilingual], (multilang) => {
      t.e(Multilingual.SUPPORTED_LANGUAGES[0].code).toBe('en');
    }));
    t.it('should default static files loader', t.inject([Multilingual], (multilang) => {
      t.e(Multilingual.STATIC_FILES_LOADER).toBe('assets/i18n');
    }));

  });

  t.describe('app.framework: Multilingual for French and should allow customization of location of i18n files', () => {
    const SUPPORTED_LANGUAGES: Array<ILang> = [
      { code: 'en', title: 'English' },
      { code: 'fr', title: 'French' }
    ];
    t.bep(() => [
      TEST_COMMON_PROVIDERS({ Window: WindowMockFrench}),
      provide(Multilingual, {
        useFactory: (translate, win) => {
          Multilingual.SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES;
          Multilingual.STATIC_FILES_LOADER = 'public/i18n';
          return new Multilingual(translate, win);
        },
        deps: [TranslateService, Window]
      })
    ]);
    t.it('should get language - french', t.inject([Multilingual], (multilang) => {
      t.e(multilang.getLang()).toBe('fr');
    }));
    t.it('should now support french', t.inject([Multilingual], (multilang) => {
      t.e(Multilingual.SUPPORTED_LANGUAGES.length).toBe(2);
      t.e(Multilingual.SUPPORTED_LANGUAGES[0].code).toBe('en');
      t.e(Multilingual.SUPPORTED_LANGUAGES[1].code).toBe('fr');
      
      if (Multilingual.SUPPORTED_LANGUAGES.length > 1) {
        // ensure it's reset back to the 1 default
        Multilingual.SUPPORTED_LANGUAGES.splice(-1);
      }
    }));
    t.it('i18n file location should be custom', t.inject([Multilingual], (multilang) => {
      t.e(Multilingual.STATIC_FILES_LOADER).toBe('public/i18n');
    }));
   
  });

}
