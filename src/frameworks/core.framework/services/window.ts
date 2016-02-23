import {Injectable} from 'angular2/core';

import {IWindow} from '../interfaces/iwindow';

@Injectable()
export class Window implements IWindow {
  
  public navigator: any = {};
  public location: any = {};
  public alert(msg: string): void { return; }
  public confirm(msg: string): void { return; }

}
