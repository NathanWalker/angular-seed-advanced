// libs
import { Angulartics2 } from 'angulartics2';
import { Angulartics2Segment } from 'angulartics2/dist/providers';

// app
import { AnalyticsService } from './services/analytics.service';

export const ANALYTICS_PROVIDERS: Array<any> = [
  Angulartics2,
  Angulartics2Segment,
  AnalyticsService
];

// services
export * from './services/analytics.service';
