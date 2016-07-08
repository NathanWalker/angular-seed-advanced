// libs
import {provideStore} from '@ngrx/store';

// app
import {nameListReducer} from './services/name-list.service';
import {MULTILINGUAL_PROVIDERS, MultilingualStateI, multilingualReducer} from '../i18n/index';

// state definition
export interface AppStoreI {
  i18n: MultilingualStateI;
  names: Array<string>;
};

export const APP_PROVIDERS: any[] = [
  MULTILINGUAL_PROVIDERS,
  provideStore({ 
    i18n: multilingualReducer,
    names: nameListReducer
  })
];

// services
export * from './services/app-config.service';
export * from './services/name-list.service';
