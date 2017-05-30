// app
import { ANALYTICS_PROVIDERS } from '../../../analytics/index';

// module
import { WindowService, StorageService, ConsoleService, LogService, LogTarget, ConsoleTarget, LogLevel, RouterExtensions, AppService } from '../../services/index';

// mocks
import { WindowMock } from '../mocks/window.mock';
import { RouterExtensionsMock } from '../mocks/router-extensions.mock';

export function TEST_CORE_PROVIDERS(options?: any): Array<any> {
  // options:
  // window:   = custom window mock (mainly for changing out language)

  let providers = [
    { provide: ConsoleService, useValue: console },
    { provide: StorageService, useValue: localStorage },
    { provide: WindowService, useClass: (options && options.window) || WindowMock },
    {
      provide: LogTarget,
      deps: [ConsoleService],
      useFactory: (c: ConsoleService) => new ConsoleTarget(c, { minLogLevel: LogLevel.Debug }),
      multi: true
    },
    LogService,
    ANALYTICS_PROVIDERS,
    { provide: RouterExtensions, useClass: RouterExtensionsMock },
    AppService
  ];

  return providers;
}
