// angular
import {Component} from 'angular2/core';

// nativescript
import {topmost} from 'ui/frame';
import {EventData} from "data/observable";
import {Page, ShownModallyData} from "ui/page";

// app
import {LogService} from '../../frameworks/core.framework/index';

@Component({
  selector: 'menu-modal',
  template: `
  <StackLayout>
    <Label text="Modal View"></Label>
    <Button text="Close" (tap)="modalClose"></Button>
  </StackLayout>
  `
})
export class MenuModal {
  private closeCallback: Function;

  constructor(private log: LogService) {

    topmost().currentPage.on('showingModally', (args: EventData) => {
      this.log.o(`showingModally`);
      let modalPage = <Page>args.object;
      if (modalPage.ios && modalPage.ios.modalPresentationStyle === UIModalPresentationStyle.UIModalPresentationFullScreen) {
        this.log.o(`Setting modalPage.ios.modalPresentationStyle to UIModalPresentationStyle.UIModalPresentationOverFullScreen`);
        modalPage.ios.modalPresentationStyle = UIModalPresentationStyle.UIModalPresentationOverFullScreen;
      }
    });
    topmost().currentPage.on('showingModally', (args: ShownModallyData) => {
      this.log.o(`showingModally`);
      this.closeCallback = args.closeCallback;
      let modalPage = <Page>args.object;

      if (topmost().currentPage.modal !== args.object) {
        throw new Error(`frame.topmost().currentPage.modal.id: ${topmost().currentPage.modal.id}; modalPage.id: ${modalPage.id}`);
      }
    });
  }

  public modalClose() {
    this.log.o(`modalClose`);

    if (this.closeCallback) {
      this.closeCallback();
    } else {
      topmost().goBack();
    }
  }
}
