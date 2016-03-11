import {EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

export class TranslateMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public getTranslation(lang: string): any {
    return {
      'TEST': 'test'
    };
  }
  public use(lang: string) {
    // console.log(lang);
  }
  public get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return Observable.of(key);
  }
}
