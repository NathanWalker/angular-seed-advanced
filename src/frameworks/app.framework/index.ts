// angular
import {provide} from 'angular2/core';

// libs
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {LogService, WindowService, StateService} from '../core.framework/index';
import {AppConfigService} from './services/app-config.service';
import {MultilingualService} from '../i18n.framework/index';

export const APP_PROVIDERS: any[] = [
  StateService,
  LogService,
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
