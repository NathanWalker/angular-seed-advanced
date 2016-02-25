// angular
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

// libs
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {ConsoleService, LogService, WindowService} from '../core.framework/index';
import {AppConfigService} from '../app.framework/index';
import {MultilingualService} from '../i18n.framework/index';

class WindowNative {
  public get navigator(): any {
    return {
      language: 'en-US'
    };
  }
}

export const NS_APP_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  provide(WindowService, { useClass: WindowNative }),
  provide(ConsoleService, { useValue: console }),
  LogService,
  TranslateService,
  provide(MultilingualService, {
    useFactory: (translate, win) => {
      // make compatible with local {N} resources
      MultilingualService.STATIC_FILES_LOADER = `~/${MultilingualService.STATIC_FILES_LOADER}`;
      console.log(`MultilingualService.STATIC_FILES_LOADER: ${MultilingualService.STATIC_FILES_LOADER}`);
      MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;
      return new MultilingualService(translate, win);
    },
    deps: [TranslateService, WindowService]
  })
];
