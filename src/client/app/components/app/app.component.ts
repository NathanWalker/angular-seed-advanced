// angular
import {ChangeDetectionStrategy} from '@angular/core';

// app
import {NameListService} from '../../frameworks/app.framework/index';
import {AnalyticsService} from '../../frameworks/analytics.framework/index';
import {RouteComponent, PlatformDirective} from '../../frameworks/core.framework/index';
import {LangSwitcherComponent} from '../../frameworks/i18n.framework/index';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';

@RouteComponent({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [NameListService],
  templateUrl: 'app.component.html',
  directives: [LangSwitcherComponent, NavbarComponent, ToolbarComponent, PlatformDirective],
  changeDetection: ChangeDetectionStrategy.Default // Everything else uses OnPush
})
export class AppComponent {
  constructor(public analytics: AnalyticsService) {

  }
}
