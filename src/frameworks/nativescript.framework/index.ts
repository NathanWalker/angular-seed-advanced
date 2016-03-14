// angular
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

// libs
import {provideStore} from '@ngrx/store';
import {routerReducer, routerMiddleware} from 'ngrx-store-router';
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {ConsoleService, LogService} from '../core.framework/index';
import {AppConfigService, nameListReducer} from '../app.framework/index';
import {MultilingualService, multilingualReducer} from '../i18n.framework/index';
// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;

export const NS_APP_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  provide(ConsoleService, { useValue: console }),
  LogService,
  provideStore({ 
    router: routerReducer, 
    i18n: multilingualReducer, 
    names: nameListReducer 
  }),
  routerMiddleware,
  TranslateService,
  MultilingualService
];
