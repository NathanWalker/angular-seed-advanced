// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { Angulartics2Module, Angulartics2Segment } from 'angulartics2';

// app
import { t } from '../../test/index';

// module
import { AnalyticsService, Analytics } from './analytics.service';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      Angulartics2Module.forRoot([
        Angulartics2Segment
      ])
    ],
    providers: [
      AnalyticsService
    ]
  });
};

export function main() {
  t.describe('analytics:', () => {

    t.be(testModuleConfig);

    t.describe('AnalyticsService', () => {

      t.describe('api works', () => {
        t.it('track', t.inject([AnalyticsService, Angulartics2Segment], (analyticsService:any, segment:any) => {
          analyticsService.devMode(false);
          t.spyOn(segment, 'eventTrack');
          analyticsService.track('click', { category: 'TEST', label: 'Testing' });
          t.e(segment.eventTrack).toHaveBeenCalledWith('click', { category: 'TEST', label: 'Testing' });
        }));
        t.it('track devMode: ON', t.inject([AnalyticsService, Angulartics2Segment], (analyticsService:any, segment:any) => {
          t.spyOn(segment, 'eventTrack');

          // dev mode: shouldn't track anything
          analyticsService.devMode(true);
          analyticsService.track('click', { category: 'TEST', label: 'Testing' });
          t.e(segment.eventTrack).not.toHaveBeenCalled();
        }));
        t.it('pageTrack', t.inject([AnalyticsService, Angulartics2Segment], (analyticsService:any, segment:any) => {
          t.spyOn(segment, 'pageTrack');
          analyticsService.pageTrack('/testing', { });
          t.e(segment.pageTrack).toHaveBeenCalledWith('/testing', {});
        }));
        t.it('pageTrack devMode: ON', t.inject([AnalyticsService, Angulartics2Segment], (analyticsService:any, segment:any) => {
          t.spyOn(segment, 'pageTrack');

          // dev mode: shouldn't track anything
          analyticsService.devMode(true);
          analyticsService.pageTrack('/testing', { });
          t.e(segment.pageTrack).not.toHaveBeenCalled();
        }));
        t.it('identify', t.inject([AnalyticsService, Angulartics2Segment], (analyticsService:any, segment:any) => {
          t.spyOn(segment, 'setUserProperties');
          analyticsService.identify({ userId: 1, name: 'Test', email: 'name@domain.com' });
          t.e(segment.setUserProperties).toHaveBeenCalledWith({ userId: 1, name: 'Test', email: 'name@domain.com' });
        }));
        t.it('identify devMode: ON', t.inject([AnalyticsService, Angulartics2Segment], (analyticsService:any, segment:any) => {
          t.spyOn(segment, 'setUserProperties');

          // dev mode: shouldn't track anything
          analyticsService.devMode(true);
          analyticsService.identify({ userId: 1, name: 'Test', email: 'name@domain.com' });
          t.e(segment.setUserProperties).not.toHaveBeenCalled();
        }));
      });
    });

    t.describe('Analytics (Base Class)', () => {

      t.describe('should allow descendants to track actions', () => {
        t.it('track', t.inject([AnalyticsService, Angulartics2Segment], (analyticsService:any, segment:any) => {
          t.spyOn(analyticsService, 'track');
          let analytics = new TestAnalytics(analyticsService);
          analytics.category = 'TEST';
          analytics.track('action', { category: analytics.category, label: 'Testing' });
          t.e(analyticsService.track).toHaveBeenCalledWith('action', { category: analytics.category, label: 'Testing' });
        }));
      });
    });
  });
}

class TestAnalytics extends Analytics { }
