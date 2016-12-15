import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NSLocationStrategy } from 'nativescript-angular/router/ns-location-strategy';

// nativescript
import * as nsApp from 'application';
import { isAndroid, isIOS } from 'platform';

if (isIOS) {
  /*
    nsApp.ios.delegate = require('../PATH/TO/DELEGATE').CustomAppDelegate;
  */
}

// libs
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate';

// app
import { AppService } from '../../../app/frameworks/core/services/app.service';
import { Config } from '../../../app/frameworks/core/utils';
import { LogService, WindowService, RouterExtensions } from '../../../app/frameworks/core/index';
import { AnalyticsService } from '../../../app/frameworks/analytics/index';
import { ActionBarUtil } from '../utils/actionbar.util';
import { MultilingualService } from '../../../app/frameworks/i18n/index';
import * as multilingual from '../../../app/frameworks/i18n/index';

declare var android: any;
const trackingId = '<%= TNS_CONFIG.ANALYTICS_TRACKING_ID %>';

@Injectable()
export class NSAppService extends AppService {
  nsApp = nsApp;

  externalRouteMap = [
    { externalUrlRegex: /\/book\/([0-9]+)/gi, internalRouteFormat: '/book/$1', transition: 'slideTop' },
  ];

  // Remember to update iOS and android constructors if you change dependencies
  // @Inject decorator is used on injectables here since this component merely extends AppComponent
  // Since @Component decorator is not used here, this ensures metadata will be generated
  constructor(public analytics: AnalyticsService,
              public log: LogService,
              public store: Store<any>,
              public router: Router,
              public multilang: MultilingualService,
              public locationstrategy: NSLocationStrategy,
              public translate: TranslateService,
              public window: WindowService
  ) {
    super(analytics, log, multilang);

    this.log.debug('NSAppService constructor');

    store.dispatch(new multilingual.ChangeAction(window.navigator.language.substr(0, 2)));

    translate.onLangChange.skip(1).subscribe((args) => {
      this.log.info(`NSAppComponent translate.onLangChange(${args.lang})`);
      // translate.setDefaultLang(args.lang);
      translate.currentLang = args.lang;

      window.navigator.language = args.lang;
    });

    // Action-bar style on iOS
    // See https://developer.apple.com/reference/uikit/uibarstyle
    ActionBarUtil.STATUSBAR_STYLE(0);

    if (String('<%= BUILD_TYPE %>') !== 'prod') {
      log.debug('NSAppCmp ----');

      router.events.subscribe((e) => {
        this.log.debug(`Router Event: ${e.toString()}`);
      });
    }

    // Fix: Reset all nsApp events before subscribing to avoid Duplicate events.
    // this.unsubscribeAll();

    nsApp.on(nsApp.launchEvent, (eventData: nsApp.LaunchEventData) => {
      this.log.info('TNS Application - Launched!');
    });

    nsApp.on(nsApp.suspendEvent, (eventData: nsApp.ApplicationEventData) => {
      this.log.info('TNS Application - Suspended');
    });

    nsApp.on(nsApp.resumeEvent, (eventData: nsApp.ApplicationEventData) => {
      this.log.info('TNS Application - Resumed');
    });

    nsApp.on(nsApp.lowMemoryEvent, (eventData: nsApp.ApplicationEventData) => {
      this.log.warn('TNS Application - !!! LOW MEMORY !!!');
    });

    nsApp.on(nsApp.exitEvent, (eventData: any) => {
      this.log.info('TNS Application - EXIT');
      this.unsubscribeAll();
    });

    this.setupAndroid();
    this.setupIOS();
  }

  private unsubscribeAll() {
    nsApp.off(nsApp.launchEvent);
    nsApp.off(nsApp.suspendEvent);
    nsApp.off(nsApp.resumeEvent);
    nsApp.off(nsApp.lowMemoryEvent);
    nsApp.off(nsApp.exitEvent);
    nsApp.off(nsApp.uncaughtErrorEvent);
  }

  protected handleUncaughtError(err: any, platform: 'android' | 'ios') {
    this.log.info(`TNS Application - Uncaught Error: ${err.message}`);

    const errorDescription: any = {
      message: err.message,
      android: platform === 'android',
      ios: platform === 'ios',
      stackTrace: err.stackTrace,
      nativeException: err.nativeException,
    };

    for (const key of Object.keys(errorDescription)) {
      if (errorDescription[key]) {
        console.log(`**** START - errorDescription.${key} - ****\n\n\n${errorDescription[key]}\n\n\n*** END - ${key} - ****`);
      }
    }
  }

  private setupAndroid() {
    if (!isAndroid) {
      return;
    }

    // Android specific code goes here

    // For the child-router in librarytabs capture android's back button and route back manually
    this.nsApp.android.on(this.nsApp.AndroidApplication.activityBackPressedEvent, (args) => {
      const states = this.locationstrategy._getSatates();
      this.log.info(`Event: ${args.eventName}\nActivity: ${args.activity}\nstates: ${JSON.stringify(states)}`);
    });

    this.nsApp.android.on(this.nsApp.AndroidApplication.activityResumedEvent, (args) => {
      if (args.activity.getIntent().getAction() === android.content.Intent.ACTION_VIEW) {
        const intentData = args.activity.getIntent().getData();
        console.log(`Android received VIEW intent, with data: ${intentData}`);
      }
    });

    this.nsApp.on(this.nsApp.uncaughtErrorEvent, (err) => {
      this.handleUncaughtError(err.android, 'android');
    });
  }

  private setupIOS() {
    if (!isIOS) {
      return;
    }

    this.nsApp.on(this.nsApp.uncaughtErrorEvent, (err) => {
      this.handleUncaughtError(err.ios, 'ios');
    });
  }
}
