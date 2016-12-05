// angular
import { Injectable, Inject, forwardRef } from '@angular/core';

// module
import { Config } from '../utils/config';
import { ConsoleService } from './console.service';

@Injectable()
export class LogService {

  constructor(@Inject(forwardRef(() => ConsoleService)) public logger: ConsoleService) {}

  // debug (standard output)
  public debug(msg: any) {
    if (Config.DEBUG.LEVEL_4) {
      // console.debug does not work on {N} apps... use `log`
      this.logger.log(msg);
    }
  }

  // error
  public error(err: any) {
    if (Config.DEBUG.LEVEL_4 || Config.DEBUG.LEVEL_3) {
      this.logger.error(err);
    }
  }

  // warn
  public warn(err: any) {
    if (Config.DEBUG.LEVEL_4 || Config.DEBUG.LEVEL_2) {
      this.logger.warn(err);
    }
  }

  // info
  public info(err: any) {
    if (Config.DEBUG.LEVEL_4 || Config.DEBUG.LEVEL_1) {
      this.logger.info(err);
    }
  }

}
