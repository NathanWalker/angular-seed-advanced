// libs
import { Store } from '@ngrx/store';

// app
import { WindowService, ConsoleService, LogService, RouterExtensions } from '../../index';
import { ANALYTICS_PROVIDERS } from '../../../analytics/index';

// mocks
import { StoreMock } from '../mocks/store.mock';
import { WindowMock } from '../mocks/window.mock';
import { RouterExtensionsMock } from '../mocks/router-extensions.mock';

export function TEST_CORE_PROVIDERS(options?: any): any[] {
  // options:
  // window:   = custom window mock (mainly for changing out language)

  let providers = [
    { provide: ConsoleService, useValue: console },
    { provide: WindowService, useClass: (options && options.window) || WindowMock },
    LogService,
    ANALYTICS_PROVIDERS,
    { provide: Store, useClass: StoreMock },
    { provide: RouterExtensions, useClass: RouterExtensionsMock },
  ];

  return providers;
}
