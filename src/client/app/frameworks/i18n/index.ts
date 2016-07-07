// angular
import {provide} from '@angular/core';
import {Http} from '@angular/http';

// libs
import {TranslateLoader, TranslateStaticLoader, TranslateService} from 'ng2-translate/ng2-translate';

// app
import {MultilingualService} from './services/multilingual.service';

export const MULTILINGUAL_PROVIDERS: any[] = [
  provide(TranslateLoader, {
    deps: [Http],
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json')
  }),
  TranslateService,
  MultilingualService
];

// services
export * from './services/multilingual.service';

// components
export * from './components/lang-switcher.component';
