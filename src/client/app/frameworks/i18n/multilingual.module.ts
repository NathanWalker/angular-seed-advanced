// angular
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http } from '@angular/http';

// libs
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

// app
import { LangSwitcherComponent } from './components/lang-switcher.component';
import { MultilingualService } from './services/multilingual.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      deps: [Http],
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json')
    })
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
  constructor(@Optional() @SkipSelf() parentModule: MultilingualModule) {
    if (parentModule) {
      throw new Error('MultilingualModule already loaded; Import in root module only.');
    }
  }
}
