// angular
import { NgModule, ModuleWithProviders, Optional, SkipSelf, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

// libs
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// module
import { Config } from '../core/index';
import { MULTILANG_COMPONENTS } from './components/index';
import { MULTILANG_PROVIDERS } from './services/index';

// for AoT compilation
export function translateLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, `${Config.IS_MOBILE_NATIVE() ? '/' : ''}assets/i18n/`, '.json');
}

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    TranslateModule.forRoot([{
      provide: TranslateLoader,
      deps: [Http],
      useFactory: (translateLoaderFactory)
    }]),
  ],
  declarations: [
    ...MULTILANG_COMPONENTS
  ],
  providers: [
    ...MULTILANG_PROVIDERS,
  ],
  exports: [
    ...MULTILANG_COMPONENTS,
    TranslateModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MultilingualModule {

  // optional usage
  // ideally we could use this to override TranslateModule, but it requires the static above at moment
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: MultilingualModule,
      providers: configuredProviders
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: MultilingualModule) {
    if (parentModule) {
      throw new Error('MultilingualModule already loaded; Import in root module only.');
    }
  }
}
