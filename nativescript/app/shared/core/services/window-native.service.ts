import {IWindow} from '../../../frameworks/core.framework/interfaces/iwindow';

export class WindowNative implements IWindow {
  public get navigator(): any {
    return {
      language: 'en-US'
    };
  }
  public get location(): any {
    return {
      host: 'nativescript'
    };
  }
  public alert(msg: string): void {
    
  }
  public confirm(msg: string): void {
    
  }
}
