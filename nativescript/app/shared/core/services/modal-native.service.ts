// angular
import {Injectable} from '@angular/core';

// nativescript
import {Page} from "ui/page";
import {EventData} from "data/observable";

@Injectable()
export class ModalNative {

  public showModal(page: Page, moduleName: string, context: any, closeCallback: Function, fullscreen?: boolean) {
    page.showModal(moduleName, context, closeCallback, fullscreen);
  }

  public onCloseModal(args: EventData) {
    let page = (<any>args.object).page;
    page.closeModal();
  }
}
