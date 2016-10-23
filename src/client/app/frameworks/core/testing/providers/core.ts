// app
import { WindowService, ConsoleService, LogService, RouterExtensions } from '../../index';
import { ANALYTICS_PROVIDERS } from '../../../analytics/index';

// mocks
import { WindowMock } from '../mocks/window.mock';
import { RouterExtensionsMock } from '../mocks/router-extensions.mock';

export function TEST_CORE_PROVIDERS(options?: any): Array<any> {
  // options:
  // window:   = custom window mock (mainly for changing out language)

  let providers = [
    { provide: ConsoleService, useValue: console },
    { provide: WindowService, useClass: (options && options.window) || WindowMock },
    LogService,
    ANALYTICS_PROVIDERS,
    { provide: RouterExtensions, useClass: RouterExtensionsMock },
  ];

  return providers;
}
