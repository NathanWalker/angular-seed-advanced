import {Injectable, EventEmitter} from 'angular2/core';

@Injectable()
export class StateService {
  public change: EventEmitter<string> = new EventEmitter();
  
  public routeActivated(msg: string) {
    this.change.emit(msg);
  }

}
