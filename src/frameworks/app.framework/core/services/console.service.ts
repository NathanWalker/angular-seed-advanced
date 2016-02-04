import {Injectable} from 'angular2/core';

import {IConsole} from '../interfaces/iconsole';

@Injectable()
export class Console implements IConsole {
  
  public log(m: any): void { return; }
  public error(m: any): void { return; }
  public warn(m: any): void { return; }
  public info(m: any): void { return; }

}
