// libs
import { Angulartics2 } from 'angulartics2';
import { Angulartics2Segment } from 'angulartics2/src/providers/angulartics2-segment';

// app
import { AnalyticsService } from '../../app/frameworks/analytics/index';
import { NSAngulartics2Segment } from './services/ns-angulartics2-segment.service';

export const NS_ANALYTICS_PROVIDERS: any[] = [
  Angulartics2,
  { provide: Angulartics2Segment, useClass: NSAngulartics2Segment },
  AnalyticsService
];
