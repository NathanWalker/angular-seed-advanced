// angular
import {Inject} from '@angular/core';
import {RouterConfig, Router} from '@angular/router';

// nativescript
import {registerElement} from 'nativescript-angular/element-registry';
import {topmost} from 'ui/frame';

// libs
import {Store} from '@ngrx/store';

// app
import {AppComponent} from '../../app/components/app/app.component';
import {AboutComponent} from '../../app/components/about/about.component';
import {HomeComponent} from '../../app/components/home/home.component';
import {routes} from '../../app/components/app/app.routes';
import {LogService} from '../../app/frameworks/core/index';
import {AnalyticsService} from '../../app/frameworks/analytics/index';
import {ActionBarUtil} from '../../shared/core/utils/actionbar.util';

export class NSAppComponent extends AppComponent {

  static routes: RouterConfig = routes;

  static entries = [
    AboutComponent,
    HomeComponent
  ]

  constructor( @Inject(AnalyticsService) public analytics: AnalyticsService, @Inject(LogService) private log: LogService, @Inject(Store) private store: Store<any>, @Inject(Router) private router: Router) {
    super(analytics, log);
    log.debug('NSAppCmp ----');

    ActionBarUtil.STATUSBAR_STYLE(1);

    router.events.subscribe((e) => {
      this.log.debug(`-- ROUTE EVENT-->: ${e.toString()}`);
    });
  }
}
