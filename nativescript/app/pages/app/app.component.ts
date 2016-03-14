// angular
import {Inject} from 'angular2/core';

// nativescript
import {registerElement} from 'nativescript-angular/element-registry';
import {ActionItem} from 'ui/action-bar';
import {topmost} from 'ui/frame';

// libs
import {Store} from '@ngrx/store';
import {RouterState} from 'ngrx-store-router';

// app
import {AppComponent} from '../../components/app/app.component';
import {LogService} from '../../frameworks/core.framework/index';
import {ModalNative} from '../../shared/core/services/modal-native.service';
import {ActionBarUtil} from '../../shared/core/utils/actionbar.util';

export class NSAppComponent extends AppComponent {
  
  constructor(@Inject(LogService) private log: LogService, @Inject(Store) private store: Store<any>, @Inject(ModalNative) private modal: ModalNative) {
    super();
    log.o('NSAppCmp ----');
    
    // let btn = new ActionItem();
    // btn.icon = 'res://ic_menu';
    // btn.ios.position = 'left';
    // btn.on('tap', this.openMenu.bind(this));
    // ActionBarUtil.ADD_BUTTON(btn);
    
    ActionBarUtil.STATUSBAR_STYLE(1);
    
    store.select('router').subscribe((router: RouterState) => {
      this.log.o(`Route change: ${router.url}`);
      switch (router.url) {
        case '':
          ActionBarUtil.SET_TITLE('Angular 2 Seed Advanced');
          break; 
        case '/about':
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
