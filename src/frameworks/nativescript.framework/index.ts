// angular
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

// libs
import {provideStore} from '@ngrx/store';
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {ConsoleService, LogService, WindowService, RouteReducer} from '../core.framework/index';
import {AppConfigService, ScientistsActions, ScientistsReducer, NameListService} from '../app.framework/index';
import {MultilingualService, MultilingualActions, MultilingualReducer} from '../i18n.framework/index';

export const NS_APP_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  provide(ConsoleService, { useValue: console }),
  LogService,
  NameListService,
  ScientistsActions,
  provideStore({ 
    routes: RouteReducer, 
    i18n: MultilingualReducer, 
    scientists: ScientistsReducer 
  }),
  TranslateService,
  provide(MultilingualService, {
    deps: [TranslateService, WindowService],
    useFactory: (translate: TranslateService, win: WindowService) => {
      MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;
      return new MultilingualService(translate, win);
    }
  }),
  MultilingualActions
];
