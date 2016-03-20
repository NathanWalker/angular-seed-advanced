// libs
import {provideStore} from '@ngrx/store';
import {routerReducer, routerMiddleware, RouterState} from 'ngrx-store-router';

// app
import {nameListReducer} from './services/name-list.service';
import {MULTILINGUAL_PROVIDERS, MultilingualStateI, multilingualReducer} from '../i18n.framework/index';

// state definition
export interface AppStoreI {
  router: RouterState;
  i18n: MultilingualStateI;
  names: Array<string>;
};

export const APP_PROVIDERS: any[] = [
  MULTILINGUAL_PROVIDERS,
  provideStore({ 
    router: routerReducer, 
    i18n: multilingualReducer,
    names: nameListReducer
  }),
  routerMiddleware
];

// services
export * from './services/app-config.service';
export * from './services/name-list.service';
