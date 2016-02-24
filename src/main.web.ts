// angular
import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';

// libs
import {TranslateService} from 'ng2-translate/ng2-translate';

// platform
import {WEB_PROVIDERS} from './frameworks/web.framework/index';

// config
import {CoreConfig, Window} from './frameworks/core.framework/index';
CoreConfig.PLATFORM_TARGET = CoreConfig.PLATFORMS.WEB;
CoreConfig.DEBUG.LEVEL_4 = true;

// app
import {APP_PROVIDERS, AppConfig} from './frameworks/app.framework/index';
import {Multilingual} from './frameworks/i18n.framework/index';
import {AppCmp} from './components/app/app';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

bootstrap(AppCmp, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
  WEB_PROVIDERS,
  APP_PROVIDERS,
  provide(Multilingual, {
    useFactory: (translate, win) => {
      Multilingual.SUPPORTED_LANGUAGES = AppConfig.SUPPORTED_LANGUAGES;
      return new Multilingual(translate, win);
    },
    deps: [TranslateService, Window]
  })
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
