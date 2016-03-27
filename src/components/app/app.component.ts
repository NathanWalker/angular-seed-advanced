// angular
import {Component} from 'angular2/core';
// import {ChangeDetectionStrategy} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

// app
import {NameListService} from '../../frameworks/app.framework/index';
// import {RouteComponent, AnalyticsService} from '../../frameworks/core.framework/index';
import {AnalyticsService} from '../../frameworks/core.framework/index';
// import {LangSwitcherComponent} from '../../frameworks/i18n.framework/index';
// import {NavbarComponent} from './navbar.component';
// import {ToolbarComponent} from './toolbar.component';
import {HomeComponent} from '../home/home.component';
// import {AboutComponent} from '../about/about.component';

// @RouteComponent({
//   selector: 'sd-app',
//   viewProviders: [NameListService],
//   templateUrl: './components/app/app.component.html',
//   directives: [LangSwitcherComponent, NavbarComponent, ToolbarComponent],
//   changeDetection: ChangeDetectionStrategy.Default // Everything else uses OnPush
// })
// @RouteConfig([
//   { path: '/', component: HomeComponent, as: 'Home' },
//   { path: '/about', component: AboutComponent, as: 'About' }
// ])
// export class AppComponent {
//   constructor(public analytics: AnalyticsService) {
//     console.log('AppComponent!');
//   }
// }

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService],
  templateUrl: './components/app/app.component.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: HomeComponent, as: 'Home' }
])  
export class AppComponent {
  constructor(private nameList:NameListService) {
    console.log('AppComponent!');
    nameList.names.subscribe((names) => {
      console.log(names);
    });
  }
}
