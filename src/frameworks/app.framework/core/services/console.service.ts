import {Injectable} from 'angular2/core';

import {ILog} from '../interfaces/ilog';

@Injectable()
export class Console implements ILog {
  
  public log(m: any): void { return; }
  public error(m: any): void { return; }
  public warn(m: any): void { return; }
  public info(m: any): void { return; }

}
