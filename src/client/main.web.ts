// angular
import {enableProdMode} from '@angular/core';

// The browser platform with a compiler
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// platfrom module
import {WebModule} from './web.module';

// example of how to use build variables to determine environment
if ('<%= ENV %>' === 'prod' || '<%= TARGET_DESKTOP_BUILD %>' === 'true') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(WebModule)
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
