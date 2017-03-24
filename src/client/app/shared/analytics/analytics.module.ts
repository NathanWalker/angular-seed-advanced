// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// lib
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2Segment } from 'angulartics2/dist/providers/segment/angulartics2-segment';

// module
import { ANALYTICS_PROVIDERS } from './index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    Angulartics2Module.forRoot([
      Angulartics2Segment
    ])
  ],
  providers: ANALYTICS_PROVIDERS
})
export class AnalyticsModule {

}
