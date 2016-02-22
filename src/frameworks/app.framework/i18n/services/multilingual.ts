import {Injectable} from 'angular2/core';

import * as _ from 'lodash';
import {TranslateService} from 'ng2-translate/ng2-translate';

import {Window} from '../../core/services/window';

export interface Lang {
  code: string;
  title: string;
}

@Injectable()
export class Multilingual {
  
  // default supported languages
  // see main.ts bootstrap for example of how to provide different value
  public static SUPPORTED_LANGUAGES: Array<Lang> = [
    { code: 'en', title: 'English' }
  ];
  
  public static STATIC_FILES_LOADER: string = 'assets/i18n';
  
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
    translate.useStaticFilesLoader(Multilingual.STATIC_FILES_LOADER);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(userLang);
  }
  
  public getLang(): string {
    return this._userLang;
  }
}
