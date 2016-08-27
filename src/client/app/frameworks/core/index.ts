// angular
import {HTTP_PROVIDERS} from '@angular/http';

// app
import {LogService} from './services/log.service';
import {RouterExtensions} from './services/router-extensions';

export const CORE_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  LogService,
  RouterExtensions,
];

// utilities
// generally static helpers (non-injectables)
export * from './utils/config';
export * from './utils/view-broker';

// decorators
export * from './decorators/base.component';
export * from './decorators/route.component';

// interfaces
export * from './interfaces/iconsole';
export * from './interfaces/iwindow';
export * from './interfaces/ilang';

// services
export * from './services/console.service';
export * from './services/log.service';
export * from './services/window.service';
export * from './services/router-extensions';

// directives
export * from './directives/platform.directive';
