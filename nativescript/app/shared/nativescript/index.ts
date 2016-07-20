// angular
import {provide} from '@angular/core';

// libs
import {Angulartics2} from 'angulartics2';
import {Angulartics2Segment} from 'angulartics2/src/providers/angulartics2-segment';
import {provideStore} from '@ngrx/store';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {NS_HTTP_PROVIDERS} from 'nativescript-angular/http';

// app
import {ConsoleService, LogService} from '../../app/frameworks/core/index';
import {AnalyticsService} from '../../app/frameworks/analytics/index';
import {AppConfigService, nameListReducer} from '../../app/frameworks/app/index';
import {MultilingualService, multilingualReducer} from '../../app/frameworks/i18n/index';
import {NSAngulartics2Segment} from './services/ns-angulartics2-segment.service';
// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;

export const NS_APP_PROVIDERS: any[] = [
  NS_HTTP_PROVIDERS,
  provide(ConsoleService, { useValue: console }),
  LogService,
  provideStore({  
    i18n: multilingualReducer, 
    names: nameListReducer 
  }),
  Angulartics2,
  provide(Angulartics2Segment, { useClass: NSAngulartics2Segment }),
  AnalyticsService,
  TranslateService,
  MultilingualService
];
