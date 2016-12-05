//angular
import { EventEmitter } from '@angular/core';

// libs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class TranslateMock {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
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
  public setDefaultLang(lang: string) {
    return;
  }
  public getLangs() {
    return ['en'];
  }
  public reloadLang(lang: string): Observable<string> {
    return Observable.of('en');
  }
}
