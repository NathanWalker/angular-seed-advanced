// electron
import * as electron from 'electron';

// app
import {IWindow} from '../../core.framework/interfaces/iwindow';

export class WindowDesktop implements IWindow {
  public get navigator(): any {
    return {
      language: 'en-US'
    };
  }
  public get location(): any {
    return {
      host: 'electron'
    };
  }
  public alert(msg: string): Promise<any> {
    return new Promise((resolve, reject) => {
      electron.dialog.showMessageBox({
        type: 'none',
        title: 'Angular 2 Seed Advanced',
        message: msg,
        buttons: ['Cancel', 'Ok']
      }, (response: any) => {
        console.log(response);
        resolve();
      });
    });
  }
  public confirm(msg: string): Promise<any> {
    return new Promise((resolve, reject) => {
      electron.dialog.showMessageBox({
        type: 'none',
        title: 'Angular 2 Seed Advanced',
        message: msg,
        buttons: ['Cancel', 'Ok']
      }, (response: any) => {
        console.log(response);
        resolve();
      });
    });
  }
}
