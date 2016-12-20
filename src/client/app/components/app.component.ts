// angular
import { ChangeDetectionStrategy, Component } from '@angular/core';
// any operators needed throughout your application
import './operators';

// app
import { AnalyticsService } from '../frameworks/analytics/index';
import { Config, LogService } from '../frameworks/core/index';

/**
 * This class represents the main application component.
 */
@Component({
  selector: 'sd-app',
  templateUrl: './app/components/app.component.html',
  changeDetection: ChangeDetectionStrategy.Default // Everything else uses OnPush
})
export class AppComponent {
  constructor(public analytics: AnalyticsService, public logger: LogService) {
    logger.debug(`Config env: ${Config.ENVIRONMENT().ENV}`);
  }
}
