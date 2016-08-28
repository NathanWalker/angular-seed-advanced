// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

// app
import { ANALYTICS_PROVIDERS } from './index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: ANALYTICS_PROVIDERS
})
export class AnalyticsModule {

}
