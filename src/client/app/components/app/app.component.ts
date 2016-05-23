// angular
import {ChangeDetectionStrategy} from '@angular/core';

// app
import {NameListService} from '../../frameworks/app.framework/index';
import {AnalyticsService} from '../../frameworks/analytics.framework/index';
import {BaseComponent, PlatformDirective} from '../../frameworks/core.framework/index';
import {LangSwitcherComponent} from '../../frameworks/i18n.framework/index';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {UIROUTER_DIRECTIVES} from 'ui-router-ng2';

@BaseComponent({
  selector: 'sd-app',
  viewProviders: [NameListService],
  templateUrl: './app/components/app/app.component.html',
  directives: [UIROUTER_DIRECTIVES,LangSwitcherComponent, NavbarComponent, ToolbarComponent, PlatformDirective],
  changeDetection: ChangeDetectionStrategy.Default // Everything else uses OnPush
})

export class AppComponent {
  constructor(public analytics: AnalyticsService) {

  }
}
