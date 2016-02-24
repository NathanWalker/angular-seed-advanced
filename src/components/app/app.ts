// angular
import {ViewEncapsulation} from 'angular2/core';
import {RouteConfig} from 'angular2/router';

// app
import {RouteComponent} from '../../frameworks/core.framework/index';
import {NavbarCmp} from './navbar';
import {ToolbarCmp} from './toolbar';
import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';
import {NameList} from '../../frameworks/app.framework/index';

@RouteComponent({
  selector: 'sd-app',
  viewProviders: [NameList],
  templateUrl: './components/app/app.html',
  directives: [NavbarCmp, ToolbarCmp],
  encapsulation: ViewEncapsulation.None
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/about', component: AboutCmp, as: 'About' }
])
export class AppCmp {}
