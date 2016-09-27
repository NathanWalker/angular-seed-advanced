import { SyncSubject } from '@ngrx/core/SyncSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class StoreMock<T> extends SyncSubject<T> {
  public dispatch(action: any):void {
    return;
  }
  public select(key: string): Observable<any> {
    return Observable.of(key);
  }
}
