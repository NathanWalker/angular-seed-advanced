// var application = require('application');
// application.mainModule = 'main.mobile.native';
// application.cssFile = 'assets/main.css';
// application.start();

import 'reflect-metadata';
import 'rxjs/add/operator/map';

// angular
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy} from 'angular2/router';

// nativescript
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {EventData} from 'data/observable';
import {topmost} from 'ui/frame';

// 3rd party dependencies
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {NSLocationStrategy} from './frameworks/mobile.framework/native/routing/ns-location-strategy';
import {NativeScriptAppConfig} from './frameworks/mobile.framework/native/core/native-script-app-config';
import {AppConfig} from './frameworks/app.framework/core/services/app-config';
import {Window} from './frameworks/app.framework/core/services/window';
import {Console} from './frameworks/app.framework/core/services/console';
import {APP_PROVIDERS} from './frameworks/app.framework/_providers';
import {Multilingual} from './frameworks/app.framework/i18n/services/multilingual';
import {AppCmp} from './components/app/app';

// config
AppConfig.PLATFORM_TARGET = AppConfig.PLATFORMS.MOBILE_NATIVE;
AppConfig.DEBUG.LEVEL_4 = true;

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
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: NSLocationStrategy }),
    APP_PROVIDERS,
    provide(Multilingual, {
      useFactory: (translate, win) => {
        Multilingual.SUPPORTED_LANGUAGES = AppConfig.SUPPORTED_LANGUAGES;
        return new Multilingual(translate, win);
      },
      deps: [TranslateService, Window]
    })
  ]);
// }
