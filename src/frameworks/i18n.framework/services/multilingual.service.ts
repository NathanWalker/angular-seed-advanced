// angular
import {Injectable} from 'angular2/core';

// libs
import * as _ from 'lodash';
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {WindowService, ILang} from '../../core.framework/index';

@Injectable()
export class MultilingualService {
  
  // default supported languages
  // see main.ts bootstrap for example of how to provide different value
  public static SUPPORTED_LANGUAGES: Array<ILang> = [
    { code: 'en', title: 'English' }
  ];
  
  // defaults to English: 'en'
  private _userLang: string = 'en';
  
  constructor(private translate: TranslateService, private win: WindowService) {
    // use navigator lang if available
    let userLang = win.navigator.language.split('-')[0];
    
    // init the lang
    this.changeLang(userLang);
  }
  
  public getLang(): string {
    return this._userLang;
  }
  
  public changeLang(lang: string) {
    if (_.includes(_.map(MultilingualService.SUPPORTED_LANGUAGES, 'code'), lang)) {
      // only if supported
      this._userLang = lang;
    }
    this.translate.use(this._userLang);
  }
}
