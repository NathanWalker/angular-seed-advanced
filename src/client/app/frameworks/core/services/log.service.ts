// angular
import { Injectable, Inject, forwardRef } from '@angular/core';

// lib
import { ConfigService } from 'ng2-config';

// module
import { ConsoleService } from './console.service';

@Injectable()
export class LogService {

  constructor(private config: ConfigService,
              @Inject(forwardRef(() => ConsoleService)) public log: ConsoleService) {}

  // debug (standard output)
  public debug(msg: any) {
    if (this.config.getSettings().logging.DEBUG.LEVEL_4) {
      // console.debug does not work on {N} apps... use `log`
      this.log.log(msg);
    }
  }

  // error
  public error(err: any) {
    if (this.config.getSettings().logging.DEBUG.LEVEL_4 || this.config.getSettings().logging.DEBUG.LEVEL_3) {
      this.log.error(err);
    }
  }

  // warn
  public warn(err: any) {
    if (this.config.getSettings().logging.DEBUG.LEVEL_4 || this.config.getSettings().logging.DEBUG.LEVEL_2) {
      this.log.warn(err);
    }
  }

  // info
  public info(err: any) {
    if (this.config.getSettings().logging.DEBUG.LEVEL_4 || this.config.getSettings().logging.DEBUG.LEVEL_1) {
      this.log.info(err);
    }
  }

}
