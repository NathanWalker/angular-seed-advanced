// angular
import {Inject} from '@angular/core';

// nativescript
import {registerElement} from 'nativescript-angular/element-registry';
import {topmost} from 'ui/frame';

// libs
import {Store} from '@ngrx/store';

// app
import {AppComponent} from '../../app/components/app/app.component';
import {LogService} from '../../app/frameworks/core/index';
import {AnalyticsService} from '../../app/frameworks/analytics/index';
import {ActionBarUtil} from '../../shared/core/utils/actionbar.util';

export class NSAppComponent extends AppComponent {

  constructor( @Inject(AnalyticsService) public analytics: AnalyticsService, @Inject(LogService) private log: LogService, @Inject(Store) private store: Store<any>) {
    super(analytics);
    log.debug('NSAppCmp ----');

    ActionBarUtil.STATUSBAR_STYLE(1);
  }
}
