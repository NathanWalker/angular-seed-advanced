// angular
import {ChangeDetectionStrategy} from '@angular/core';

// app
import {AnalyticsService} from '../../frameworks/analytics/index';
import {RouteComponent, PlatformDirective, LogService, Config} from '../../frameworks/core/index';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@RouteComponent({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  directives: [NavbarComponent, ToolbarComponent, PlatformDirective],
  changeDetection: ChangeDetectionStrategy.Default // Everything else uses OnPush
})
export class AppComponent {
  constructor(public analytics: AnalyticsService, public logger: LogService) {
    logger.debug('Environment config:');
    logger.debug(Config);
  }
}
