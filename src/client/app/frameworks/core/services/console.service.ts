// angular
import { Injectable } from '@angular/core';

// module
import { IConsole } from '../interfaces/iconsole';

@Injectable()
export class ConsoleService implements IConsole {
  
  public log(m: any): void { return; }
  public debug(m: any): void { return; }
  public error(m: any): void { return; }
  public warn(m: any): void { return; }
  public info(m: any): void { return; }

}
