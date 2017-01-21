// app
import { ConsoleService } from './console.service';
import { LogService } from './log.service';
import { RouterExtensions } from './router-extensions.service';
import { WindowService } from './window.service';
import { AppService } from './app.service';

export const CORE_PROVIDERS: any[] = [
  AppService,
  ConsoleService,
  LogService,
  RouterExtensions,
  WindowService
];

export * from './app.service';
export * from './console.service';
export * from './log.service';
export * from './router-extensions.service';
export * from './window.service';
