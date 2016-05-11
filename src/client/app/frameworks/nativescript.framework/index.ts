// angular
import {provide} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

// libs
import {Angulartics2} from 'angulartics2';
import {Angulartics2Segment} from 'angulartics2/src/providers/angulartics2-segment';
import {provideStore} from '@ngrx/store';
import {routerReducer, routerMiddleware} from 'ngrx-store-router';
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {ConsoleService, LogService} from '../core.framework/index';
import {AnalyticsService} from '../analytics.framework/index';
import {AppConfigService, nameListReducer} from '../app.framework/index';
import {MultilingualService, multilingualReducer} from '../i18n.framework/index';
import {NSAngulartics2Segment} from './services/ns-angulartics2-segment.service';
import {NSLogService} from './services/ns-log.service';
// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;

export const NS_APP_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  provide(ConsoleService, { useValue: console }),
  provide(LogService, { useClass: NSLogService }),
  provideStore({ 
    router: routerReducer, 
    i18n: multilingualReducer, 
    names: nameListReducer 
  }),
  routerMiddleware,
  Angulartics2,
  provide(Angulartics2Segment, { useClass: NSAngulartics2Segment }),
  AnalyticsService,
  TranslateService,
  MultilingualService
];
