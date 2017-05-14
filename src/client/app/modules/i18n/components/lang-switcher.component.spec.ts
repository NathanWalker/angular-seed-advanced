import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { StoreModule } from '@ngrx/store';

import { t } from '../../test/index';
import { ILang, WindowService, ConsoleService, provideConsoleTarget, LogLevel } from '../../core/index';
import { CoreModule } from '../../core/core.module';
import { AnalyticsModule } from '../../analytics/analytics.module';
import { SharedModule } from '../../shared/index';
import { MultilingualModule } from '../multilingual.module';
import { MultilingualService, reducer, Languages, LanguageViewHelper } from '../index';
import { getLanguages } from '../testing/index';

// test module configuration for each test
const testModuleConfig = (languages?: Array<ILang>) => {
  let providers = [
    provideConsoleTarget(LogLevel.Debug),
    { provide: LanguageViewHelper, useValue: null }
  ];
  if (languages) {
    providers.push({
      provide: Languages,
      useValue: languages
    });
  }
  TestBed.configureTestingModule({
    imports: [
      CoreModule.forRoot([
        { provide: WindowService, useValue: window },
        { provide: ConsoleService, useValue: console }
      ]),
      SharedModule,
      RouterTestingModule,
      AnalyticsModule,
      MultilingualModule,
      StoreModule.provideStore({ i18n: reducer })
    ],
    declarations: [TestComponent],
    providers
  });
  TestBed.compileComponents();
};

export function main() {
  t.describe('i18n:', () => {
    t.describe('@Component: LangSwitcherComponent', () => {
      t.be(t.async(() => testModuleConfig([{ code: 'en', title: 'English' }])));

      t.it('should work',
        () => {
          let fixture = TestBed.createComponent(TestComponent);
          fixture.detectChanges();
          let appDOMEl = fixture.debugElement.children[0].nativeElement;
          t.e(appDOMEl.querySelectorAll('form > select option').length).toBe(1);
          t.e(appDOMEl.querySelectorAll('form > select option')[0].value).toBe('en');

        });
    });

    t.describe('@Component: LangSwitcherComponent with multiple languages', () => {
      t.be(t.async(() => testModuleConfig(getLanguages())));

      t.it('should work',
        () => {
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
    });
  });
}

@Component({
  selector: 'test-cmp',
  template: '<lang-switcher></lang-switcher>'
})
class TestComponent { }
