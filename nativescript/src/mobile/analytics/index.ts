// libs
import { Angulartics2, Angulartics2Segment } from 'angulartics2';

// app
import { AnalyticsService } from '../../app/modules/analytics/index';
import { NSAngulartics2Segment } from './services/ns-angulartics2-segment.service';

export const NS_ANALYTICS_PROVIDERS: Array<any> = [
  Angulartics2,
  { provide: Angulartics2Segment, useClass: NSAngulartics2Segment },
  AnalyticsService
];
