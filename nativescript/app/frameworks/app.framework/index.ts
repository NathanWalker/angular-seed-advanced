// angular
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

// libs
import {TranslateLoader, TranslateStaticLoader, TranslateService} from 'ng2-translate/ng2-translate';

// app
import {LogService, WindowService, StateService} from '../core.framework/index';
import {AppConfigService} from './services/app-config.service';
import {MultilingualService} from '../i18n.framework/index';

export const APP_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  StateService,
  LogService,
  provide(TranslateLoader, {
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
    deps: [Http]
  }),
  TranslateService,
  provide(MultilingualService, {
    useFactory: (translate, win) => {
      MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;
      return new MultilingualService(translate, win);
    },
    deps: [TranslateService, WindowService]
  })
  
];

// scientists
export * from './scientists/services/name-list.service';

// general
export * from './services/app-config.service';
