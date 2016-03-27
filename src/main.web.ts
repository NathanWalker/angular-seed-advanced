// angular
import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

// config
import {CoreConfigService} from './frameworks/core.framework/index';
CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.WEB;
CoreConfigService.DEBUG.LEVEL_4 = true;

// app
import {WindowService, ConsoleService, ENV_PROVIDERS, CORE_PROVIDERS} from './frameworks/core.framework/index';
import {MultilingualService} from './frameworks/i18n.framework/index';
import {APP_PROVIDERS, AppConfigService} from './frameworks/app.framework/index';
import {AppComponent} from './components/app/app.component';
// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;

bootstrap(AppComponent, [
  ENV_PROVIDERS,
  provide(WindowService, { useValue: window }),
  provide(ConsoleService, { useValue: console }),
  CORE_PROVIDERS,
  APP_PROVIDERS
])
.catch(err => console.error(err));

// In order to start the Service Worker located at "./sw.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./sw.js').then(function(registration) {
//     console.log('ServiceWorker registration successful with scope: ',    registration.scope);
//   }).catch(function(err) {
//     console.log('ServiceWorker registration failed: ', err);
//   });
// }
