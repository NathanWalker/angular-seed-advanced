// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Angulartics2Module, Angulartics2Segment } from 'angulartics2';

// app
import { t } from '../../test/index';
import { CoreModule, ILang, WindowService, ConsoleService } from '../../core/index';
import { TEST_CORE_PROVIDERS, WindowMockFrench } from '../../core/testing/index';

// module
import { TEST_MULTILINGUAL_PROVIDERS, getLanguages } from '../testing/index';
import { IMultilingualState, MultilingualService, MultilingualEffects, reducer, ChangeAction, Languages } from '../index';

// test module configuration for each test
const testModuleConfig = (options?: any) => {
  let langProvider = [];
  if (options.languages) {
    langProvider.push({
      provide: Languages,
      useValue: options.languages
    });
  }
  TestBed.configureTestingModule({
    imports: [
      CoreModule.forRoot([
        { provide: WindowService, useValue: window },
        { provide: ConsoleService, useValue: console }
      ]),
      Angulartics2Module.forRoot([
        Angulartics2Segment
      ]),
      StoreModule.provideStore({ i18n: reducer }),
      EffectsModule.run(MultilingualEffects),
      RouterTestingModule
    ],
    providers: [
      TEST_CORE_PROVIDERS(options),
      TEST_MULTILINGUAL_PROVIDERS(),
      langProvider
    ]
  });
  TestBed.compileComponents();
};

export function main() {
  t.describe('i18n:', () => {
    t.describe('MultilingualService', () => {

      t.be(t.async(() => {
        testModuleConfig({
          languages: [{
            code: 'en', title: 'English'
          }]
        });
      }));

      t.it('should at a minimum support english', t.inject([Languages], (languages: any, store: Store<any>) => {
        t.e(languages.length).toBe(1);
        t.e(languages[0].code).toBe('en');
      }));

      t.it('changeLang - should not switch unless supported', t.inject([MultilingualService, Store], (multilang: MultilingualService, store: Store<any>) => {
        store.dispatch(new ChangeAction('fr'));
        // only 'en' supported by default so changing to 'fr' should not change state
        store.select('i18n').subscribe((i18n: IMultilingualState) => {
          t.e(i18n.lang).toBe('en');
        });
      }));

    });

    t.describe('MultilingualService for French browser/platform', () => {

      t.be(t.async(() => {
        testModuleConfig({
          window: WindowMockFrench,
          languages: [
            { code: 'en', title: 'English' },
            { code: 'fr', title: 'French' }
          ]
        });
      }));

      t.it('should now support french by default', t.inject([MultilingualService, Store, WindowService, Languages], (multilang: MultilingualService, store: Store<any>, win: WindowService, languages) => {
        t.e(languages.length).toBe(2);
        t.e(languages[0].code).toBe('en');
        t.e(languages[1].code).toBe('fr');
        t.e(win.navigator.language).toBe('fr-US');

        store.select('i18n').subscribe((i18n: IMultilingualState) => {
          t.e(i18n.lang).toBe('fr');
        });
      }));
    });
  });
}
