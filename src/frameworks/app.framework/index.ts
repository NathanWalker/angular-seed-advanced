// angular
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

// libs
import {TranslateLoader, TranslateStaticLoader, TranslateService} from 'ng2-translate/ng2-translate';

// app
import {LogService, WindowService} from '../core.framework/index';
import {AppConfigService} from './services/app-config.service';
import {MULTILINGUAL_PROVIDERS, MultilingualService} from '../i18n.framework/index';

export const APP_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  LogService,
  MULTILINGUAL_PROVIDERS,
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
