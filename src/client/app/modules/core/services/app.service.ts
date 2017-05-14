import { Injectable } from '@angular/core';

// app
import { AnalyticsService } from '../../../modules/analytics/services/analytics.service';
import { LogService } from './logging/log.service';
import { Config } from '../utils/config';

@Injectable()
export class AppService {
  constructor(public analytics: AnalyticsService, public log: LogService) {
    this.log.debug(`AppService -> Config env: ${Config.ENVIRONMENT().ENV}`);
  }
}
