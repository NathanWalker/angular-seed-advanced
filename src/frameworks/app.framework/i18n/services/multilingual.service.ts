import {Injectable} from 'angular2/core';

import _ = require('lodash');
import {TranslateService} from 'ng2-translate/ng2-translate';

@Injectable()
export class Multilingual {
  
  // default supported languages
  // see main.ts bootstrap for example of how to provide different value
  public static SUPPORTED_LANGUAGES: Array<Object> = [
    { code: 'en', label: 'English' }
  ];
  
  // defaults to English: 'en'
  private _userLang: string = 'en';
  
  constructor(private translate: TranslateService, private win: Window) {
    // use navigator lang if available
    let userLang = win.navigator.language.split('-')[0];
    if (_.includes(_.map(Multilingual.SUPPORTED_LANGUAGES, 'code'), userLang)) {
      // only if supported
      this._userLang = userLang;
    }

    // this will load translate json files
    translate.useStaticFilesLoader('assets/i18n');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(userLang);
  }
  
  public getLang(): string {
    return this._userLang;
  }
}
