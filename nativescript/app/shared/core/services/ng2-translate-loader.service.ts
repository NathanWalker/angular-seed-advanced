// angular
import {Injectable, Optional} from 'angular2/core';

// nativescript
import {knownFolders} from 'file-system';

// libs
import {TranslateLoader} from 'ng2-translate/ng2-translate';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class NSMultilingualLoader implements TranslateLoader {
  private _currentLang: string;
  private _currentTranslation: any;
  private _loaderParams: any = { prefix: 'i18n', suffix: '.json' };

  constructor(@Optional() prefix: string, @Optional() suffix?: string) {
    this.configure(prefix, suffix);
  }

  public configure(prefix: string, suffix: string) {
    this._loaderParams.prefix = prefix ? prefix : this._loaderParams.prefix;
    this._loaderParams.suffix = suffix ? suffix : this._loaderParams.suffix;
  }

  public getTranslation(lang: string): Observable<any> {
    if (this._currentLang !== lang) {
      this._currentLang = lang;
      let app = knownFolders.currentApp();
      let locale = app.getFile(`${this._loaderParams.prefix}/${lang}${this._loaderParams.suffix}`);
      return Observable.fromPromise(new Promise((resolve, reject) => {
        locale.readText().then((data) => {
          try {
            this._currentTranslation = JSON.parse(data);
            resolve(this._currentTranslation);
          } catch (err) {
            throw new Error('Error parsing locale JSON file.');
            reject(err);
          }
        }, (err) => {
          throw new Error('Error reading locale file.');
          reject(err);
        });  
      }));
      
    } else {
      return Observable.of(this._currentTranslation);
    }
  }
}
