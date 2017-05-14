import { Injectable, Provider } from '@angular/core';
import { LogTargetBase, LogEvent, LogLevel, LogTargetOptions, LogTarget } from './log.target';
import { ConsoleService } from '../console.service';

@Injectable()
export class ConsoleTarget extends LogTargetBase {
  constructor(private console: ConsoleService, options: LogTargetOptions) {
    super(options);
  }

  writeToLog(event: LogEvent) {
    switch (event.level) {
      case LogLevel.Debug:
        this.console.log(event.message);
        break;
      case LogLevel.Info:
        this.console.info(event.message);
        break;
      case LogLevel.Warning:
        this.console.warn(event.message);
        break;
      case LogLevel.Error:
        this.console.error(event.message);
        break;
    }
    return Promise.resolve();
  }
}

export function createConsoleTarget(level: LogLevel, consoleService: ConsoleService) {
  return new ConsoleTarget(consoleService, { minLogLevel: level });
}

export function provideConsoleTarget(logLevel: LogLevel): Provider {
  return {
    provide: LogTarget, deps: [ConsoleService],
    multi: true,
    useFactory: (c: ConsoleService) => new ConsoleTarget(c, { minLogLevel: logLevel })
  };
}
