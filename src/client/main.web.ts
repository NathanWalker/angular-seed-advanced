// angular
import {provide, enableProdMode} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms/index';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';

// config
import {CoreConfigService} from './app/frameworks/core.framework/index';
CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.WEB;
CoreConfigService.DEBUG.LEVEL_4 = true;

// app
import {WindowService, ConsoleService, CORE_PROVIDERS} from './app/frameworks/core.framework/index';
import {ANALYTICS_PROVIDERS} from './app/frameworks/analytics.framework/index';
import {MultilingualService} from './app/frameworks/i18n.framework/index';
import {APP_PROVIDERS, AppConfigService} from './app/frameworks/app.framework/index';
import {APP_ROUTER_PROVIDERS} from './app/components/app/app.routes';
import {AppComponent} from './app/components/app/app.component';
// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;

// depending on environments, you could push in different providers as needed
const ENV_PROVIDERS: Array<any> = [];

// example of how to use build variables to determine environment
if ('<%= ENV %>' === 'prod' || '<%= TARGET_DESKTOP_BUILD %>' === 'true') {
  enableProdMode();
} 

let BOOTSTRAP_PROVIDERS: any[] = [
  disableDeprecatedForms(),
  provideForms(),
  ENV_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
  provide(WindowService, { useValue: window }),
  provide(ConsoleService, { useValue: console }),
  CORE_PROVIDERS,
  ANALYTICS_PROVIDERS,
  APP_PROVIDERS,
  APP_ROUTER_PROVIDERS
];

if ('<%= TARGET_DESKTOP %>' === 'true') {
  CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  BOOTSTRAP_PROVIDERS.push(provide(LocationStrategy, {useClass: HashLocationStrategy}));
}  

bootstrap(AppComponent, BOOTSTRAP_PROVIDERS)
.catch((err:any) => console.error(err));

// In order to start the Service Worker located at "./worker.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
//
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./worker.js').then((registration: any) =>
//       console.log('ServiceWorker registration successful with scope: ', registration.scope))
//     .catch((err: any) =>
//       console.log('ServiceWorker registration failed: ', err));
// }
