// app
import { ConsoleService } from './console.service';
import { LogService } from './log.service';
import { RouterExtensions } from './router-extensions.service';
import { WindowService } from './window.service';

export const CORE_PROVIDERS: any[] = [
  ConsoleService,
  LogService,
  RouterExtensions,
  WindowService
];

export * from './console.service';
export * from './log.service';
export * from './router-extensions.service';
export * from './window.service';
