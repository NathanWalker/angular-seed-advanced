// angular
import {provide} from 'angular2/core';

// libs
import {Store} from '@ngrx/store';

// app
import {WindowService, ConsoleService, LogService} from '../../core.framework/index';

// mocks
import {WindowMock} from '../mocks/window.mock';
import {StoreMock} from '../mocks/@ngrx/store.mock';

// common
export function TEST_COMMON_PROVIDERS(options?: any): any[] {
  // options:
  // Window: token = custom window mock (mainly for changing out language)
  
  let providers = [
    LogService,
    provide(ConsoleService, { useValue: console }),
    provide(WindowService, { useClass: (options && options.Window) || WindowMock }),
    provide(Store, { useClass: StoreMock })
  ];
  
  return providers;
}
