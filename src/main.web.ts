// angular
import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {APP_BASE_HREF} from 'angular2/router';

// libs
import {provideStore, combineReducers} from '@ngrx/store';

// config
import {CoreConfigService} from './frameworks/core.framework/index';
CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.WEB;
CoreConfigService.DEBUG.LEVEL_4 = true;

// app
import {ConsoleService, WindowService, RouteReducer} from './frameworks/core.framework/index';
import {APP_PROVIDERS, ScientistsReducer} from './frameworks/app.framework/index';
import {MultilingualReducer} from './frameworks/i18n.framework/index';
import {AppComponent} from './components/app/app.component';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

bootstrap(AppComponent, [
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
  provide(WindowService, { useValue: window }),
  provide(ConsoleService, { useValue: console }),
  provideStore(combineReducers({ 
    routes: RouteReducer, 
    i18n: MultilingualReducer,
    scientists: ScientistsReducer
  })),
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
