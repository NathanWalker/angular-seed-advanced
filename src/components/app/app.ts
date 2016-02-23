import {RouteComponent} from '../../frameworks/core.framework/index';
import {LangSwitcherCmp} from '../../frameworks/i18n.framework/index';
import {NameList} from '../../frameworks/app.framework/index';

import {
  RouteConfig
} from 'angular2/router';

import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';

@RouteComponent({
  selector: 'app',
  viewProviders: [NameList],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  directives: [LangSwitcherCmp]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/about', component: AboutCmp, as: 'About' }
])
export class AppCmp {}
