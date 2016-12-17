import { Injectable } from '@angular/core';

// app
import { AnalyticsService } from '../../../frameworks/analytics/index';
import { LogService } from './log.service';
import { Config } from '../utils/config';
import { MultilingualService } from '../../../frameworks/i18n/index';

@Injectable()
export class AppService {
  constructor(public analytics: AnalyticsService, public log: LogService, public multilang: MultilingualService) {
    this.log.debug(`AppService -> Config env: ${Config.ENVIRONMENT().ENV}`);
  }
}
