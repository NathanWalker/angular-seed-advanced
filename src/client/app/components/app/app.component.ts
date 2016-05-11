// angular
import {ChangeDetectionStrategy} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

// app
import {NameListService} from '../../frameworks/app.framework/index';
import {AnalyticsService} from '../../frameworks/analytics.framework/index';
import {RouteComponent, PlatformDirective} from '../../frameworks/core.framework/index';
import {LangSwitcherComponent} from '../../frameworks/i18n.framework/index';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {HomeComponent} from '../home/home.component';
import {AboutComponent} from '../about/about.component';

@RouteComponent({
  selector: 'sd-app',
  viewProviders: [NameListService],
  templateUrl: './app/components/app/app.component.html',
  directives: [LangSwitcherComponent, NavbarComponent, ToolbarComponent, PlatformDirective],
  changeDetection: ChangeDetectionStrategy.Default // Everything else uses OnPush
})
@RouteConfig([
  {
    path: '/',
    component: HomeComponent,
    name: 'Home'
  },
  {
    path: '/about',
    component: AboutComponent,
    name: 'About'
  }
])
export class AppComponent {
  constructor(public analytics: AnalyticsService) {

  }
}
