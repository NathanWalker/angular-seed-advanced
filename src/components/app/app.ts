import {Base} from '../../frameworks/app.framework/core/decorators/base.component';
import {LangSwitcherCmp} from '../../frameworks/app.framework/i18n/components/lang-switcher.component';

import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';
import {NameList} from '../../frameworks/app.framework/scientists/services/name_list';

@Base({
  selector: 'app',
  viewProviders: [NameList],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  directives: [ROUTER_DIRECTIVES, LangSwitcherCmp]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/about', component: AboutCmp, as: 'About' }
])
export class AppCmp {}
