// angular
import {provide, enableProdMode} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from 'angular2/router';

// config
import {CoreConfigService} from './frameworks/core.framework/index';
CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.WEB;
CoreConfigService.DEBUG.LEVEL_4 = true;

// app
import {WindowService, ConsoleService, CORE_PROVIDERS} from './frameworks/core.framework/index';
import {MultilingualService} from './frameworks/i18n.framework/index';
import {APP_PROVIDERS, AppConfigService} from './frameworks/app.framework/index';
import {AppComponent} from './components/app/app.component';
// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;

const ENV_PROVIDERS: Array<any> = [];
if ('<%= ENV %>' === 'prod' || '<%= TARGET_DESKTOP_BUILD %>' === 'true') {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
} 

let BOOTSTRAP_PROVIDERS: any[] = [
  ENV_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
  provide(WindowService, { useValue: window }),
  provide(ConsoleService, { useValue: console }),
  CORE_PROVIDERS,
  APP_PROVIDERS
];

if ('<%= TARGET_DESKTOP %>' === 'true') {
  CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  BOOTSTRAP_PROVIDERS.push(provide(LocationStrategy, {useClass: HashLocationStrategy}));
}  

bootstrap(AppComponent, BOOTSTRAP_PROVIDERS)
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
