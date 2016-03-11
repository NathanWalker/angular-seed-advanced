import {Observable} from 'rxjs/Observable';

export class StoreMock {
  public dispatch(action: any):void {
    return;
  }
  public select(key: string): Observable<any> {
    return Observable.of(key);
  }
}
