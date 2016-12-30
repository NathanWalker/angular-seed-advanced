// angular
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

// libs
import { Store } from '@ngrx/store';
import { ConfigService } from 'ng2-config';

// app
import { AppComponent } from '../../app/components/app.component';
import { LogService } from '../../app/frameworks/core/index';
import { AnalyticsService } from '../../app/frameworks/analytics/index';
import { MultilingualService } from '../../app/frameworks/i18n/index';
import { ActionBarUtil } from '../../shared/core/utils/actionbar.util';

export class NSAppComponent extends AppComponent {

  // @Inject decorator is used on injectables here since this component merely extends AppComponent
  // Since @Component decorator is not used here, this ensures metadata will be generated
  constructor( @Inject(AnalyticsService) public analytics: AnalyticsService, @Inject(LogService) public log: LogService, @Inject(ConfigService) public config: ConfigService, @Inject(MultilingualService) public multilang: MultilingualService, @Inject(Store) private store: Store<any>, @Inject(Router) private router: Router) {
    super(analytics, log, config, multilang);
    log.debug('NSAppComponent constructor');

    ActionBarUtil.STATUSBAR_STYLE(1);

    router.events.subscribe((e) => {
      this.log.debug(`Router Event: ${e.toString()}`);
    });
  }
}
