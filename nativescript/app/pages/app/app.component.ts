// angular
import {Inject} from '@angular/core';

// nativescript
import {registerElement} from 'nativescript-angular/element-registry';
import {topmost} from 'ui/frame';

// libs
import {Store} from '@ngrx/store';
import {RouterState} from 'ngrx-store-router';

// app
import {AppComponent} from '../../app/components/app/app.component';
import {LogService} from '../../app/frameworks/core.framework/index';
// import {AnalyticsService} from '../../frameworks/analytics.framework/index';
import {ModalNative} from '../../shared/core/services/modal-native.service';
import {ActionBarUtil} from '../../shared/core/utils/actionbar.util';

export class NSAppComponent extends AppComponent {
  
  // constructor( @Inject(AnalyticsService) public analytics: AnalyticsService, @Inject(LogService) private log: LogService, @Inject(Store) private store: Store<any>, @Inject(ModalNative) private modal: ModalNative) {
  constructor(@Inject(LogService) private log: LogService, @Inject(Store) private store: Store<any>, @Inject(ModalNative) private modal: ModalNative) {
    // super(analytics);
    super();
    log.debug('NSAppCmp ----');
    
    ActionBarUtil.STATUSBAR_STYLE(1);

    // example of how to receive router updates from ngrx/store
    // store.select('router').subscribe((router: RouterState) => {
    //   this.log.debug(`Route change: ${router.url}`);
    //   switch (router.url) {
    //     case '':
    //       // do something on home
    //       break; 
    //     case '/about':
    //       // do something on about
    //       break;
    //   }
    // });
  }
  
  private openMenu() {
    this.modal.showModal(topmost().currentPage, './pages/menu/menu.component', 'Context', () => {
      this.log.debug(`modal closed`);
    });
  }
}
