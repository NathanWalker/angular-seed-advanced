/**
 * This is mainly for Android as it does not support console.debug
 * Extend to use console.log instead
 */
import {Injectable, Inject, forwardRef} from '@angular/core';

import {CoreConfigService, ConsoleService, LogService} from '../../core.framework/index';

@Injectable()
export class NSLogService extends LogService {

  constructor(@Inject(forwardRef(() => ConsoleService)) public logger: ConsoleService) {
    super(logger);
  }
  
  public debug(msg: string) {
    if (CoreConfigService.DEBUG.LEVEL_4) {
      this.logger.log(msg); // <-- use `log` instead of `debug`
    }
  }
}
