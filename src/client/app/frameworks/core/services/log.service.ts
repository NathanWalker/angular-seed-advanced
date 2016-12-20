// angular
import { Injectable, Inject, forwardRef } from '@angular/core';

// lib
import { ConfigService } from 'ng2-config';

// module
//import { Config } from '../utils/config';
import { ConsoleService } from './console.service';

@Injectable()
export class LogService {

  constructor(private config: ConfigService,
              @Inject(forwardRef(() => ConsoleService)) public logger: ConsoleService) {}

  // debug (standard output)
  public debug(msg: any) {
    //if (Config.DEBUG.LEVEL_4) {
    if (this.config.getSettings().logging.DEBUG.LEVEL_4) {
      // console.debug does not work on {N} apps... use `log`
      this.logger.log(msg);
    }
  }

  // error
  public error(err: any) {
    //if (Config.DEBUG.LEVEL_4 || Config.DEBUG.LEVEL_3) {
    if (this.config.getSettings().logging.DEBUG.LEVEL_4 || this.config.getSettings().logging.DEBUG.LEVEL_3) {
      this.logger.error(err);
    }
  }

  // warn
  public warn(err: any) {
    //if (Config.DEBUG.LEVEL_4 || Config.DEBUG.LEVEL_2) {
    if (this.config.getSettings().logging.DEBUG.LEVEL_4 || this.config.getSettings().logging.DEBUG.LEVEL_2) {
      this.logger.warn(err);
    }
  }

  // info
  public info(err: any) {
    //if (Config.DEBUG.LEVEL_4 || Config.DEBUG.LEVEL_1) {
    if (this.config.getSettings().logging.DEBUG.LEVEL_4 || this.config.getSettings().logging.DEBUG.LEVEL_1) {
      this.logger.info(err);
    }
  }

}
