import {Inject} from 'angular2/core';
import {AppComponent} from '../../components/app/app.component';
import {LogService} from '../../frameworks/core.framework/index';
import {ActionBarUtil} from '../../shared/utils/actionbar.util';

export class NSAppComponent extends AppComponent {
  
  constructor(@Inject(LogService) private log: LogService) {
    super();
    log.o('NSAppCmp ----');
    ActionBarUtil.SET_TITLE('Angular 2 Seed Advanced');
  }
}
