// angular
import {provide} from 'angular2/core';
import {Http} from 'angular2/http';

// libs
import {TranslateLoader, TranslateStaticLoader, TranslateService} from 'ng2-translate/ng2-translate';

// i18n
import {MultilingualActions} from './state/multilingual.actions';

export const MULTILINGUAL_PROVIDERS: any[] = [
  MultilingualActions,
  provide(TranslateLoader, {
    deps: [Http],
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json')
  }),
  TranslateService
];

// services
export * from './services/multilingual.service';

// state
export * from './state/multilingual.actions';
export * from './state/multilingual.reducer';

// components
export * from './components/lang-switcher.component';
