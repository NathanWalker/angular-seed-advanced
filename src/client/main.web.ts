/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */
import { enableProdMode } from '@angular/core';
// The browser platform with a compiler
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// Load i18n providers
// import { TranslationProviders } from './i18n.providers';

// platfrom module
import { WebModule } from './web.module';

// example of how to use build variables to determine environment
if (String('<%= BUILD_TYPE %>') === 'prod' || String('<%= TARGET_DESKTOP_BUILD %>') === 'true') {
  enableProdMode();
}

// NOTE: Commented lines come from parent (angular-seed)
// TODO: In future, may pivot from ng2-translate to parent seed implementation
// Compile and launch the module with i18n providers
// let TP = new TranslationProviders();
// TP.getTranslationFile().then((providers: any) => {
  // const options: any = { providers };
  platformBrowserDynamic().bootstrapModule(WebModule/*, options*/);
// });
