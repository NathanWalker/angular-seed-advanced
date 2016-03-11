// angular
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

// libs
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {LogService, WindowService} from '../core.framework/index';
import {AppConfigService} from './services/app-config.service';
import {NameListService} from './scientists/services/name-list.service';
import {ScientistsActions} from './state/scientists.actions';
import {MULTILINGUAL_PROVIDERS, MultilingualService} from '../i18n.framework/index';

export const APP_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  LogService,
  NameListService,
  ScientistsActions,
  MULTILINGUAL_PROVIDERS,
  provide(MultilingualService, {
    deps: [TranslateService, WindowService],
    useFactory: (translate: TranslateService, win: WindowService) => {
      MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;
      return new MultilingualService(translate, win);
    }
  })
];

// scientists
export * from './scientists/services/name-list.service';

// general
export * from './services/app-config.service';

// state
export * from './state/scientists.actions';
export * from './state/scientists.reducer';
