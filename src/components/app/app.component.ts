// angular
import {RouteConfig} from 'angular2/router';

// app
import {RouteComponent} from '../../frameworks/core.framework/index';
import {LangSwitcherComponent} from '../../frameworks/i18n.framework/index';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {HomeComponent} from '../home/home.component';
import {AboutComponent} from '../about/about.component';

@RouteComponent({
  selector: 'sd-app',
  templateUrl: './components/app/app.component.html',
  directives: [LangSwitcherComponent, NavbarComponent, ToolbarComponent]
})
@RouteConfig([
  { path: '/', component: HomeComponent, as: 'Home' },
  { path: '/about', component: AboutComponent, as: 'About' }
])
export class AppComponent {}
