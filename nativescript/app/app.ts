// var application = require('application');
// application.mainModule = 'main.mobile.native';
// application.cssFile = 'assets/main.css';
// application.start();

// nativescript
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {NS_ROUTER_PROVIDERS, NS_ROUTER_DIRECTIVES} from 'nativescript-angular/router';
import {EventData} from 'data/observable';
import {topmost} from 'ui/frame';

import 'reflect-metadata';
import 'rxjs/add/operator/map';

// angular
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {LocationStrategy} from 'angular2/router';

// 3rd party dependencies
import {TranslateService} from 'ng2-translate/ng2-translate';

// config
import {CoreConfig} from './frameworks/core.framework/services/core_config';
CoreConfig.PLATFORM_TARGET = CoreConfig.PLATFORMS.MOBILE_NATIVE;
CoreConfig.DEBUG.LEVEL_4 = true;
CoreConfig.ROUTER_DIRECTIVES = NS_ROUTER_DIRECTIVES;

// app
import {NativeScriptConfig} from './frameworks/mobile.framework/index';
import {Window, Console} from './frameworks/core.framework/index';
import {APP_PROVIDERS, AppConfig} from './frameworks/app.framework/index';
import {Multilingual} from './frameworks/i18n.framework/index';
import {AppCmp} from './components/app/app';

declare var UIBarStyle: any;

class WindowNative {
  public get navigator(): any {
    return {
      language: 'en-US'
    };
  }
}

// export function loaded(args: EventData) {
//   let page = <any>args.object;
//   NativeScriptAppConfig.PAGE = page;

  // if (page.ios) {
  //   let navigationBar = topmost().ios.controller.navigationBar;
  //   navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
  // }
  
nativeScriptBootstrap(AppCmp, [
  provide(Window, { useClass: WindowNative }),
  provide(Console, { useValue: console }),
  HTTP_PROVIDERS,
  NS_ROUTER_PROVIDERS,
  APP_PROVIDERS,
  provide(Multilingual, {
    useFactory: (translate, win) => {
      // make compatible with local {N} resources
      Multilingual.STATIC_FILES_LOADER = `~/${Multilingual.STATIC_FILES_LOADER}`;
      Multilingual.SUPPORTED_LANGUAGES = AppConfig.SUPPORTED_LANGUAGES;
      return new Multilingual(translate, win);
    },
    deps: [TranslateService, Window]
  })
]);
// }
