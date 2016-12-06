// angular
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http } from '@angular/http';

// libs
import { TranslateModule, TranslateStaticLoader } from 'ng2-translate';

// app
import { Config } from '../core/index';

// module
import { LangSwitcherComponent } from './components/index';
import { MultilingualService } from './services/index';

// for AoT compilation
export function translateFactory(http: Http) {
  return new TranslateStaticLoader(http, `${Config.IS_MOBILE_NATIVE() ? '/' : ''}assets/i18n`, '.json');
};

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot()
  ],
  declarations: [
    LangSwitcherComponent
  ],
  exports: [
    LangSwitcherComponent,
    TranslateModule
  ],
  providers: [
    MultilingualService
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
