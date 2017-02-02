export enum LogLevel {
  Debug = 0,
  Info = 1,
  Warning = 2,
  Error = 4
}

export interface LogEvent {
  message: string | Object;
  level: LogLevel;
}

export abstract class LogTargetOptions {
  minLogLevel: LogLevel;
}

export abstract class LogTarget {
  abstract log(event: LogEvent): Promise<any>;
}

export abstract class LogTargetBase implements LogTarget {
  constructor(protected options: LogTargetOptions) {
  }

  log(event: LogEvent): Promise<any> {
    if (event.level >= this.options.minLogLevel) {
      return this.writeToLog(event);
    }
    return Promise.resolve();
  }

  protected abstract writeToLog(event: LogEvent): Promise<any>;
}
