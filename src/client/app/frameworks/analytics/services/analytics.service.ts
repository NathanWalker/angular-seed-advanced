// angular
import { Injectable, Inject } from '@angular/core';

// libs
import * as _ from 'lodash';
import { Angulartics2, Angulartics2Segment } from 'angulartics2';

export interface IAnalyticsProperties {
  category?: string;
  label?: string;
  value?: number;
}

export interface IAnalytics {
  track(action: string, properties: IAnalyticsProperties): void;
}

/**
 * Wrapper for Angulartics2
 */
@Injectable()
export class AnalyticsService implements IAnalytics {

  constructor(private angulartics2: Angulartics2, private segment: Angulartics2Segment) {
    // options
    // https://github.com/angulartics/angulartics2/blob/master/src/core/angulartics2.ts#L90-L104
    // angulartics2.virtualPageviews(value: boolean);
    // angulartics2.excludeRoutes(routes: Array<string>);
    // angulartics2.firstPageview(value: boolean);
    // angulartics2.withBase(value: string);

    this.devMode(false);
  }

  /**
   * Track actions, events, etc.
   **/
  public track(action: string, properties: IAnalyticsProperties): void {
    if (!this.devMode()) {
      this.segment.eventTrack(action, properties);
    }
  }

  /**
   * Called automatically by default with Angular 2 Routing
   * However, that can be turned off and this could be used manually
   **/
  public pageTrack(path: string, location: any) {
    if (!this.devMode()) {
      this.segment.pageTrack(path, location);
    }
  }

  /**
   * Identify authenticated users
   **/
  public identify(properties: any) {
    if (!this.devMode()) {
      this.segment.setUserProperties(properties);
    }
  }

  /**
   * Control whether analytics are tracked
   * true: dev mode on, therefore do not track anything
   * false: dev mode off, track everything
   **/
  public devMode(enable?: boolean): boolean {
    if (typeof enable !== 'undefined') {
      this.angulartics2.developerMode(enable);
    }
    return this.angulartics2.settings.developerMode;
  }
}

/**
 * Base class
 * Standardizes tracking actions and categorization
 */
export class Analytics implements IAnalytics {
  // sub-classes should define their category
  public category: string;

  constructor(@Inject(AnalyticsService) public analytics: AnalyticsService) {

  }

  /**
   * Track actions, events, etc.
   **/
  track(action: string, properties: IAnalyticsProperties): void {
    this.analytics.track(action, _.extend(properties, { category: this.category }));
  }
}
