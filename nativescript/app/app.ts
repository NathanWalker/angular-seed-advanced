// import 'reflect-metadata';
// import 'rxjs/add/operator/map';

// nativescript
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {NS_ROUTER_DIRECTIVES, nsProvideRouter} from 'nativescript-angular/router';

// angular 
import {provide, enableProdMode} from '@angular/core';

// libs
import {TranslateLoader} from 'ng2-translate/ng2-translate';
import {TNSTranslateLoader} from 'nativescript-ng2-translate/nativescript-ng2-translate';

// config
import {Config, WindowService} from './app/frameworks/core/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;
Config.DEBUG.LEVEL_4 = true;
Config.ROUTER_DIRECTIVES = NS_ROUTER_DIRECTIVES;

// app
import {NS_APP_PROVIDERS} from './shared/nativescript/index';
import {routes} from './app/components/app/app.routes';
import {NSAppComponent} from './pages/app/app.component';
import {WindowNative} from './shared/core/index';
  
// Uncomment when ready to publish to App Stores:
// enableProdMode();

nativeScriptBootstrap(NSAppComponent, [
  provide(WindowService, { useClass: WindowNative }),
  provide(TranslateLoader, {
    useFactory: () => {
      return new TNSTranslateLoader('assets/i18n');
    }
  }),
  NS_APP_PROVIDERS,
  nsProvideRouter(routes, { enableTracing: false })
]);
