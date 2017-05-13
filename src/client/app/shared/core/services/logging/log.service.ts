// angular
import { Injectable, Inject, forwardRef } from '@angular/core';
import * as _ from 'lodash';
// module
import { Config } from '../../utils/config';
import { ConsoleService } from '../console.service';
import { LogTarget, LogEvent, LogLevel } from './log.target';

@Injectable()
export class LogService {

  constructor( @Inject(LogTarget) private targets: LogTarget[]) {
  }

  // debug (standard output)
  public debug(...msg) {
    if (Config.DEBUG.LEVEL_4) {
      // console.debug does not work on {N} apps... use `log`
      return Promise.all(_.map(this.targets, logger => this.logEvent(logger, msg, LogLevel.Debug)));
    }
    return Promise.resolve();
  }

  // error
  public error(...err) {
    if (Config.DEBUG.LEVEL_4 || Config.DEBUG.LEVEL_3) {
      return Promise.all(_.map(this.targets, logger => this.logEvent(logger, err, LogLevel.Error)));
    }
    return Promise.resolve();
  }

  // warn
  public warn(...err) {
    if (Config.DEBUG.LEVEL_4 || Config.DEBUG.LEVEL_2) {
      return Promise.all(_.map(this.targets, logger => this.logEvent(logger, err, LogLevel.Warning)));
    }
    return Promise.resolve();
  }

  // info
  public info(...err) {
    if (Config.DEBUG.LEVEL_4 || Config.DEBUG.LEVEL_1) {
      return Promise.all(_.map(this.targets, logger => this.logEvent(logger, err, LogLevel.Info)));
    }
    return Promise.resolve();
  }

  private logEvent(target: LogTarget, message: string | Object, level: LogLevel) {
    return target.log({ level: level, message: message });
  }
}
