// libs
import { Angulartics2 } from 'angulartics2';
import { Angulartics2Segment } from 'angulartics2/src/providers/angulartics2-segment';

// app
import { AnalyticsService } from './services/analytics.service';

export const ANALYTICS_PROVIDERS: any[] = [
  Angulartics2,
  Angulartics2Segment,
  AnalyticsService
];

// services
export * from './services/analytics.service';
