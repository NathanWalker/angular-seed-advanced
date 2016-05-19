// angular
import {provide, enableProdMode} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ELEMENT_PROBE_PROVIDERS} from '@angular/platform-browser';
import {PathLocationStrategy, PlatformLocation} from "@angular/common";
import {BrowserPlatformLocation} from '@angular/platform-browser';

// config
import {CoreConfigService} from './app/frameworks/core.framework/index';
CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.WEB;
CoreConfigService.DEBUG.LEVEL_4 = true;

// app
import {WindowService, ConsoleService, CORE_PROVIDERS} from './app/frameworks/core.framework/index';
import {ANALYTICS_PROVIDERS} from './app/frameworks/analytics.framework/index';
import {MultilingualService} from './app/frameworks/i18n.framework/index';
import {APP_PROVIDERS, AppConfigService} from './app/frameworks/app.framework/index';
import {AppComponent} from './app/components/app/app.component';
import {trace, UIROUTER_PROVIDERS, UiView, UIRouterConfig, Category, UIROUTER_DIRECTIVES} from "ui-router-ng2";
import {MyUIRouterConfig} from "./app/router.config";

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
  provide(LocationStrategy, { useClass: PathLocationStrategy }),
  provide(PlatformLocation, { useClass: BrowserPlatformLocation }),
  provide(UIRouterConfig, { useClass: MyUIRouterConfig }),
  ...UIROUTER_PROVIDERS,
  CORE_PROVIDERS,
  ANALYTICS_PROVIDERS,
  APP_PROVIDERS
];

if ('<%= TARGET_DESKTOP %>' === 'true') {
  CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  BOOTSTRAP_PROVIDERS.push(provide(LocationStrategy, {useClass: HashLocationStrategy}));
}

trace.enable(Category.TRANSITION, Category.VIEWCONFIG);

bootstrap(UiView, BOOTSTRAP_PROVIDERS)
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
