// libs
import { Angulartics2 } from 'angulartics2';
import { Angulartics2Segment } from 'angulartics2/dist/providers';

// app
import { AnalyticsService } from '../../app/shared/analytics/index';
import { NSAngulartics2Segment } from './services/ns-angulartics2-segment.service';

export const NS_ANALYTICS_PROVIDERS: Array<any> = [
  Angulartics2,
  { provide: Angulartics2Segment, useClass: NSAngulartics2Segment },
  AnalyticsService
];
