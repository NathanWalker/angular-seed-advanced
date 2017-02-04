// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// app
import { t } from '../../test/index';
import { CoreModule } from '../../core/core.module';
import { ILang, WindowService, ConsoleService } from '../../core/index';
import { TEST_CORE_PROVIDERS, WindowMockFrench } from '../../core/testing/index';

// module
import { TEST_MULTILINGUAL_PROVIDERS, TEST_MULTILINGUAL_RESET } from '../testing/index';
import { IMultilingualState, MultilingualService, MultilingualEffects, reducer, ChangeAction } from '../index';

// test module configuration for each test
const testModuleConfig = (options?: any) => {
  TestBed.configureTestingModule({
    imports: [
      CoreModule.forRoot([
        { provide: WindowService, useValue: window },
        { provide: ConsoleService, useValue: console }
      ]),
      StoreModule.provideStore({ i18n: reducer }),
      EffectsModule.run(MultilingualEffects),
      RouterTestingModule
    ],
    providers: [
      TEST_CORE_PROVIDERS(options),
      TEST_MULTILINGUAL_PROVIDERS()
    ]
  });
};

export function main() {
  t.describe('i18n:', () => {
    t.describe('MultilingualService', () => {

      t.be(() => {
        testModuleConfig();
      });

      t.it('should at a minimum support english', () => {
        t.e(MultilingualService.SUPPORTED_LANGUAGES.length).toBe(1);
        t.e(MultilingualService.SUPPORTED_LANGUAGES[0].code).toBe('en');
      });

      t.it('changeLang - should not switch unless supported', t.inject([MultilingualService, Store], (multilang: MultilingualService, store: Store<any>) => {
        store.dispatch(new ChangeAction('fr'));
        // only 'en' supported by default so changing to 'fr' should not change state
        store.select('i18n').subscribe((i18n: IMultilingualState) => {
          t.e(i18n.lang).toBe('en');
        });
      }));

    });

    t.describe('MultilingualService for French browser/platform', () => {
      const SUPPORTED_LANGUAGES: Array<ILang> = [
        { code: 'en', title: 'English' },
        { code: 'fr', title: 'French' }
      ];

      t.be(() => {
        MultilingualService.SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES;
        testModuleConfig({ window: WindowMockFrench });
      });

      // ensure statics are reset when the test had modified statics in a beforeEach (be) or beforeEachProvider (bep)
      t.ae(() => TEST_MULTILINGUAL_RESET());

      t.it('should now support french by default', t.inject([MultilingualService, Store, WindowService], (multilang: MultilingualService, store: Store<any>, win: WindowService) => {
        t.e(MultilingualService.SUPPORTED_LANGUAGES.length).toBe(2);
        t.e(MultilingualService.SUPPORTED_LANGUAGES[0].code).toBe('en');
        t.e(MultilingualService.SUPPORTED_LANGUAGES[1].code).toBe('fr');
        t.e(win.navigator.language).toBe('fr-US');

        store.select('i18n').subscribe((i18n: IMultilingualState) => {
          t.e(i18n.lang).toBe('fr');
        });
      }));
    });
  });
}
