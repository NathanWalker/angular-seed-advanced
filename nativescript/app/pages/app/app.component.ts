// angular
import {Inject} from '@angular/core';

// nativescript
import {registerElement} from 'nativescript-angular/element-registry';
import {topmost} from 'ui/frame';

// libs
import {Store} from '@ngrx/store';

// app
import {AppComponent} from '../../app/components/app/app.component';
import {LogService} from '../../app/frameworks/core.framework/index';
import {AnalyticsService} from '../../app/frameworks/analytics.framework/index';
import {ModalNative} from '../../shared/core/services/modal-native.service';
import {ActionBarUtil} from '../../shared/core/utils/actionbar.util';

export class NSAppComponent extends AppComponent {
  
  constructor( @Inject(AnalyticsService) public analytics: AnalyticsService, @Inject(LogService) private log: LogService, @Inject(Store) private store: Store<any>, @Inject(ModalNative) private modal: ModalNative) {
    super(analytics);
    log.debug('NSAppCmp ----');
    
    ActionBarUtil.STATUSBAR_STYLE(1);
  }
  
  private openMenu() {
    this.modal.showModal(topmost().currentPage, './pages/menu/menu.component', 'Context', () => {
      this.log.debug(`modal closed`);
    });
  }
}
