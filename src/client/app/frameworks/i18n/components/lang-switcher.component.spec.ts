import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { StoreModule } from '@ngrx/store';

import { t } from '../../test/index';
import { ILang, WindowService, ConsoleService } from '../../core/index';
import { CoreModule } from '../../core/core.module';
import { AnalyticsModule } from '../../analytics/analytics.module';
import { MultilingualModule } from '../multilingual.module';
import { MultilingualService, multilingualReducer } from '../index';
import { TEST_MULTILINGUAL_RESET } from '../testing/index';

const SUPPORTED_LANGUAGES: Array<ILang> = [
  { code: 'en', title: 'English' },
  { code: 'es', title: 'Spanish' },
  { code: 'fr', title: 'French' },
  { code: 'ru', title: 'Russian' },
  { code: 'bg', title: 'Bulgarian' }
];

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      CoreModule.forRoot([
        { provide: WindowService, useValue: window },
        { provide: ConsoleService, useValue: console }
      ]),
      RouterTestingModule, AnalyticsModule, MultilingualModule, StoreModule.provideStore({ i18n: multilingualReducer })],
    declarations: [TestComponent]
  });
};

export function main() {
  t.describe('i18n:', () => {
    t.describe('@Component: LangSwitcherComponent', () => {
      t.be(testModuleConfig);

      t.it('should work',
        t.async(() => {
          TestBed.compileComponents()
            .then(() => {
              let fixture = TestBed.createComponent(TestComponent);
              fixture.detectChanges();
              let appDOMEl = fixture.debugElement.children[0].nativeElement;
              t.e(appDOMEl.querySelectorAll('form > select option').length).toBe(1);
              t.e(appDOMEl.querySelectorAll('form > select option')[0].value).toBe('en');
            });
        }));
    });

    t.describe('@Component: LangSwitcherComponent with multiple languages', () => {
      t.be(() => {
        MultilingualService.SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES;
        testModuleConfig();
      });

      // ensure statics are reset when the test had modified statics in a beforeEach (be) or beforeEachProvider (bep)
      t.ae(() => TEST_MULTILINGUAL_RESET());

      t.it('should work',
        t.async(() => {
          TestBed.compileComponents()
            .then(() => {
              let fixture = TestBed.createComponent(TestComponent);
              fixture.detectChanges();
              let appDOMEl = fixture.debugElement.children[0].nativeElement;
              t.e(appDOMEl.querySelectorAll('form > select option').length).toBe(5);
              t.e(appDOMEl.querySelectorAll('form > select option')[0].value).toBe('en');
              t.e(appDOMEl.querySelectorAll('form > select option')[1].value).toBe('es');
              t.e(appDOMEl.querySelectorAll('form > select option')[2].value).toBe('fr');
              t.e(appDOMEl.querySelectorAll('form > select option')[3].value).toBe('ru');
              t.e(appDOMEl.querySelectorAll('form > select option')[4].value).toBe('bg');
            });
        }));
    });
  });
}

@Component({
  selector: 'test-cmp',
  template: '<lang-switcher></lang-switcher>'
})
class TestComponent {}
