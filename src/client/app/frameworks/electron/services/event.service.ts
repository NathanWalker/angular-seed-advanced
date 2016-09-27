import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

declare var window: any;

export class ElectronEventService {

  public static on(name: string): Observable<any> {
    return Observable.fromEvent(window, name);
  }

  // TODO: add more helpers for menu setup and more...  
}
