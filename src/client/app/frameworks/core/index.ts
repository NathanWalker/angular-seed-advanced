// angular
import {HTTP_PROVIDERS} from '@angular/http';

// app
import {LogService} from './services/log.service';

export const CORE_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  LogService
];

// decorators
export * from './decorators/base.component';
export * from './decorators/form.component';
export * from './decorators/route.component';

// interfaces
export * from './interfaces/iconsole';
export * from './interfaces/iwindow';
export * from './interfaces/ilang';

// services
export * from './services/config.service';
export * from './services/console.service';
export * from './services/log.service';
export * from './services/view-broker.service';
export * from './services/window.service';

// directives
export * from './directives/platform.directive';
