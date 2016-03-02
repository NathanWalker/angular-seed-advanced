// angular
import {Inject} from 'angular2/core';

// nativescript
import {registerElement} from 'nativescript-angular/element-registry';
import {ActionItem} from 'ui/action-bar';
import {topmost} from 'ui/frame';

// app
import {AppComponent} from '../../components/app/app.component';
import {LogService, StateService} from '../../frameworks/core.framework/index';
import {ModalNative} from '../../shared/core/services/modal-native.service';
import {ActionBarUtil} from '../../shared/core/utils/actionbar.util';

export class NSAppComponent extends AppComponent {
  
  constructor(@Inject(LogService) private log: LogService, @Inject(StateService) private state: StateService, @Inject(ModalNative) private modal: ModalNative) {
    super();
    log.o('NSAppCmp ----');
    
    // let btn = new ActionItem();
    // btn.icon = 'res://ic_menu';
    // btn.ios.position = 'left';
    // btn.on('tap', this.openMenu.bind(this));
    // ActionBarUtil.ADD_BUTTON(btn);
    
    ActionBarUtil.STATUSBAR_STYLE(1);
    
    this.state.change.subscribe((msg: string) => {
      this.log.o(`Route change: ${msg}`);
      switch (msg) {
        case 'Home':
          ActionBarUtil.SET_TITLE('Angular 2 Seed Advanced');
          break; 
        case 'About':
          ActionBarUtil.SET_TITLE('About');
          break;
      }
    });
  }
  
  private openMenu() {
    this.modal.showModal(topmost().currentPage, './pages/menu/menu.component', 'Context', () => {
      this.log.o(`modal closed`);
    });
  }
}
