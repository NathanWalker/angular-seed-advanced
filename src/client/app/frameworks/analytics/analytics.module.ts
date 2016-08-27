// angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

// libs
import { Angulartics2 } from 'angulartics2';
import { Angulartics2Segment } from 'angulartics2/src/providers/angulartics2-segment';

// app
import { AnalyticsService } from './services/analytics.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    Angulartics2,
    Angulartics2Segment,
    AnalyticsService
  ]
})
export class AnalyticsModule {

}
