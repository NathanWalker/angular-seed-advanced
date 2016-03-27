// angular
import {provide} from 'angular2/core';
import {LocationStrategy, HashLocationStrategy} from 'angular2/router';

// app
import {CORE_PROVIDERS} from '../core.framework/index';
import {APP_PROVIDERS} from '../app.framework/index';

export const DESKTOP_APP_PROVIDERS: any[] = [
  CORE_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  APP_PROVIDERS
];

// services
export * from './services/window-desktop.service';
