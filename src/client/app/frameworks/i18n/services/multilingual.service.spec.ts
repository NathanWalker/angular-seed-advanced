// angular
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

// libs
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ConfigLoader, ConfigService } from 'ng2-config';

// app
import { t } from '../../test/index';
import { CoreModule, configFactory } from '../../core/core.module';
import { ILang, WindowService, ConsoleService } from '../../core/index';
import { TEST_CORE_PROVIDERS, WindowMockFrench, WindowMockNoLanguage  } from '../../core/testing/index';

// module
import { TEST_MULTILINGUAL_PROVIDERS } from '../testing/index';
import { IMultilingualState, MultilingualService, MultilingualEffects, reducer, ChangeAction } from '../index';

const mockSettings = {
  i18n: {
    defaultLanguage: {
      code: 'fr',
      title: 'Français'
    },
    availableLanguages: [
      {
        code: 'en',
        title: 'English'
      },
      {
        code: 'fr',
        title: 'Français'
      }
    ]
  }
};

const mockBackendResponse = (connection: MockConnection, response: any) => {
    connection.mockRespond(new Response(new ResponseOptions({ body: response })));
};

// test module configuration for each test
const testModuleConfig = (options?: any) => {
  // reset the test environment before initializing it.
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [
        CoreModule.forRoot([
          { provide: WindowService, useValue: window },
          { provide: ConsoleService, useValue: console },
          { provide: ConfigLoader, useFactory: (configFactory) }
        ]),
        StoreModule.provideStore({ i18n: reducer }),
        EffectsModule.run(MultilingualEffects),
        RouterTestingModule
      ],
      providers: [
        TEST_CORE_PROVIDERS(options),
        TEST_MULTILINGUAL_PROVIDERS(),
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
    t.describe('MultilingualService', () => {
      t.be(() => {
        testModuleConfig();
      });

      t.it('should at a minimum support english',
        t.inject([ConfigService, MultilingualService],
          (config: ConfigService, multilang: MultilingualService) => {
            multilang.init(config.getSettings().i18n);

            t.e(multilang.availableLanguages.length).toBe(1);
            t.e(multilang.availableLanguages[0].code).toBe('en');
          }));

      t.it('changeLang - should not switch unless supported',
        t.inject([ConfigService, MultilingualService, Store],
          (config: ConfigService, multilang: MultilingualService, store: Store<any>) => {
            multilang.init(config.getSettings().i18n);
            multilang.changeLang('fr');

            // only 'en' supported by default so changing to 'fr' should not change state
            store.select('i18n')
              .subscribe((i18n: IMultilingualState) => {
                t.e(i18n.lang).toBe('en');
              });
          }));
    });

    t.describe('MultilingualService for French browser/platform', () => {
      t.be(() => {
        testModuleConfig({
          window: WindowMockFrench,
          config: ConfigService
        });
      });

      t.it('should now support french by default',
        t.async(t.inject([MockBackend, ConfigService, MultilingualService, Store, WindowService],
          (backend: MockBackend, config: ConfigService, multilang: MultilingualService, store: Store<any>, win: WindowService) => {
            // mock response
            backend.connections.subscribe((c: MockConnection) => mockBackendResponse(c, mockSettings));

            config.init()
              .then(() => {
                multilang.init(config.getSettings().i18n);

                t.e(multilang.availableLanguages.length).toBe(2);
                t.e(multilang.availableLanguages[0].code).toBe('en');
                t.e(multilang.availableLanguages[1].code).toBe('fr');
                t.e(win.navigator.language).toBe('fr-US');

                store.select('i18n')
                  .subscribe((i18n: IMultilingualState) => {
                    t.e(i18n.lang).toBe('fr');
                  });
                });
      })));
    });

    t.describe('MultilingualService for languageless browser/platform', () => {
      t.be(() => {
        testModuleConfig({
          window: WindowMockNoLanguage
        });
      });

      t.it('should now support english by default',
        t.inject([ConfigService, MultilingualService, Store, WindowService],
          (config: ConfigService, multilang: MultilingualService, store: Store<any>, win: WindowService) => {
            multilang.init(config.getSettings().i18n);

            t.e(multilang.availableLanguages.length).toBe(1);
            t.e(multilang.availableLanguages[0].code).toBe('en');
            t.e(win.navigator.language).toBeUndefined();

            store.select('i18n')
              .subscribe((i18n: IMultilingualState) => {
                t.e(i18n.lang).toBe('en');
              });
      }));
    });
  });
}
