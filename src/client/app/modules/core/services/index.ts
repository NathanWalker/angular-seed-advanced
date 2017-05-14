// app
import { ConsoleService } from './console.service';
import { LogService } from './logging/log.service';
import { RouterExtensions } from './router-extensions.service';
import { WindowService } from './window.service';
import { AppService } from './app.service';

export const CORE_PROVIDERS: any[] = [
  WindowService,
  ConsoleService,
  LogService,
  AppService,
  RouterExtensions,
];

export * from './console.service';
export * from './logging/index';
export * from './router-extensions.service';
export * from './window.service';
export * from './app.service';
