// angular
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ConfigService } from 'ng2-config';

// app
import { t } from '../../test/index';
import { ILang, WindowService, ConsoleService } from '../../core/index';
import { CoreModule } from '../../core/core.module';
import { AnalyticsModule } from '../../analytics/analytics.module';
import { TEST_CORE_PROVIDERS } from '../../core/testing/index';

// module
import { MultilingualModule } from '../multilingual.module';
import { MultilingualService, MultilingualEffects, reducer } from '../index';
import { TEST_MULTILINGUAL_PROVIDERS } from '../testing/index';

// mocks
import { ConfigMock } from '../../core/testing/mocks/ng2-config.mock';
import { ConfigMockMultilang } from '../testing/mocks/ng2-config-multilang.mock';

const SUPPORTED_LANGUAGES: Array<ILang> = [
  { code: 'en', title: 'English' },
  { code: 'es', title: 'Spanish' },
  { code: 'fr', title: 'French' },
  { code: 'ru', title: 'Russian' },
  { code: 'bg', title: 'Bulgarian' }
];

// test module configuration for each test
const testModuleConfig = (multilang: boolean = false) => {
  TestBed.configureTestingModule({
    imports: [
      CoreModule.forRoot([
        { provide: WindowService, useValue: window },
        { provide: ConsoleService, useValue: console },
        { provide: ConfigService, useClass: multilang ? ConfigMockMultilang : ConfigMock },
      ]),
      RouterTestingModule,
      AnalyticsModule,
      MultilingualModule,
      StoreModule.provideStore({ i18n: reducer }),
      EffectsModule.run(MultilingualEffects)
    ],
    declarations: [TestComponent],
    providers: [
      {
        provide: Http,
        useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
          return new Http(mockBackend, options);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      MockBackend,
      BaseRequestOptions
    ]
  });
};

export function main() {
  t.describe('i18n:', () => {
    t.describe('@Component: LangSwitcherComponent', () => {
      t.be(() => {
        testModuleConfig();
      });

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
        testModuleConfig(true);
      });

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
class TestComponent  {
  constructor(private multilang: MultilingualService,
              private config: ConfigService) {
    this.multilang.init(this.config.getSettings().i18n);
  }
}
