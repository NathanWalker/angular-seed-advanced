// angular
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// any operators needed throughout your application
import './operators';

// app
import { AnalyticsService } from '../shared/analytics/index';
import { Config, LogService, AppService } from '../shared/core/index';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.Default // Everything else uses OnPush
})
export class AppComponent {
  constructor(
    public analytics: AnalyticsService,
    public log: LogService,
    private appService: AppService
  ) {
    log.debug(`Config env: ${Config.ENVIRONMENT().ENV}`);
  }
}
