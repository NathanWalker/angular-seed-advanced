// angular
import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// app
import { SharedModule } from '../shared/index';
import { SAMPLE_PROVIDERS } from './services/index';
import { MultilingualModule } from '../i18n/multilingual.module';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    SharedModule,
    MultilingualModule,
  ],
  providers: [
    ...SAMPLE_PROVIDERS
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    SharedModule
  ]
})
export class SampleModule {

  constructor(@Optional() @SkipSelf() parentModule: SampleModule) {
    if (parentModule) {
      throw new Error('SampleModule already loaded; Import in root module only.');
    }
  }
}
