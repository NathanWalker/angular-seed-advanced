import {Component, ViewEncapsulation} from 'angular2/core';
import {FORM_DIRECTIVES, ControlGroup, Control} from 'angular2/common';

var _ = require('lodash');
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

import {ConfigService} from '../../shared/services/config.service';

import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {HomeCmp} from '../../home/components/home';
import {AboutCmp} from '../../about/components/about';
import {NameList} from '../../shared/services/name_list';

@Component({
  selector: 'app',
  viewProviders: [NameList],
  templateUrl: './app/components/app.html',
  styleUrls: ['./app/components/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
  pipes: [TranslatePipe]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/about', component: AboutCmp, as: 'About' }
])
export class AppCmp {
  public langForm: ControlGroup;
  public supportedLanguages: Array<Object> = ConfigService.supportedLanguages;

  constructor(public translate: TranslateService) {
    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    if (!_.includes(_.map(this.supportedLanguages, 'code'), userLang)) {
      // default to english
      userLang = 'en';
    }

    // this will load translate json files from src/public/i18n
    translate.useStaticFilesLoader('assets/i18n');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(userLang);

    this.langForm = new ControlGroup({
      lang: new Control(userLang)
    });
  }
  changeLang(e) {
    console.log(this.langForm.value);
    this.translate.use(this.langForm.value.lang);
  }
}
