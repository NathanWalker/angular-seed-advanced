// angular
import { NgModule, Optional, SkipSelf } from '@angular/core';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule()
export class AppStateModule {

  constructor(@Optional() @SkipSelf() parentModule: AppStateModule) {
    if (parentModule) {
      throw new Error('AppStateModule already loaded; Import in root module only.');
    }
  }
}
