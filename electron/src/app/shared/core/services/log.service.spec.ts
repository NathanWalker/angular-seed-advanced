// angular
import { TestBed } from '@angular/core/testing';

// app
import { t } from '../../test/index';

// module
import { Config, ConsoleService, LogService } from '../index';

const providers: Array<any> = [
  { provide: ConsoleService, useValue: console },
  LogService
];

export function main() {
  t.describe('core: LogService', () => {

    t.be(() => {
      // ensure statics are in default state
      Config.RESET();
      // spy
      t.spyOn(console, 'log');
      t.spyOn(console, 'error');
      t.spyOn(console, 'warn');
      t.spyOn(console, 'info');

      TestBed.configureTestingModule({
        providers: providers
      });
    });

    t.describe('api', () => {

      t.it('sanity', t.inject([LogService], (log: LogService) => {
        t.e(log.debug).toBeDefined();
        t.e(log.error).toBeDefined();
        t.e(log.warn).toBeDefined();
        t.e(log.info).toBeDefined();
      }));

      t.it('should not log anything by default', t.inject([LogService], (log: LogService) => {
        log.debug('debug');
        t.e(console.log).not.toHaveBeenCalledWith('debug');
        log.error('error');
        t.e(console.error).not.toHaveBeenCalledWith('error');
        log.warn('warn');
        t.e(console.warn).not.toHaveBeenCalledWith('warn');
        log.info('info');
        t.e(console.info).not.toHaveBeenCalledWith('info');
      }));
    });

    t.describe('debug levels', () => {

      t.be(() => {
        Config.RESET();
      });

      t.it('LEVEL_4: everything', t.inject([LogService], (log: LogService) => {
        Config.DEBUG.LEVEL_4 = true;

        log.debug('debug');
        t.e(console.log).toHaveBeenCalledWith('debug');
        log.error('error');
        t.e(console.error).toHaveBeenCalledWith('error');
        log.warn('warn');
        t.e(console.warn).toHaveBeenCalledWith('warn');
        log.info('info');
        t.e(console.info).toHaveBeenCalledWith('info');
      }));

      t.it('LEVEL_3: error only', t.inject([LogService], (log: LogService) => {
        Config.DEBUG.LEVEL_3 = true;

        log.debug('debug');
        t.e(console.log).not.toHaveBeenCalledWith('debug');
        log.error('error');
        t.e(console.error).toHaveBeenCalledWith('error');
        log.warn('warn');
        t.e(console.warn).not.toHaveBeenCalledWith('warn');
        log.info('info');
        t.e(console.info).not.toHaveBeenCalledWith('info');

        // always overrides lower levels and allows them to come through
        Config.DEBUG.LEVEL_4 = true;

        log.debug('debug w/level_4');
        t.e(console.log).toHaveBeenCalledWith('debug w/level_4');
        log.error('error w/level_4');
        t.e(console.error).toHaveBeenCalledWith('error w/level_4');
        log.warn('warn w/level_4');
        t.e(console.warn).toHaveBeenCalledWith('warn w/level_4');
        log.info('info w/level_4');
        t.e(console.info).toHaveBeenCalledWith('info w/level_4');
      }));

      t.it('LEVEL_2: warn only', t.inject([LogService], (log: LogService) => {
        Config.DEBUG.LEVEL_2 = true;

        log.debug('debug');
        t.e(console.log).not.toHaveBeenCalledWith('debug');
        log.error('error');
        t.e(console.error).not.toHaveBeenCalledWith('error');
        log.warn('warn');
        t.e(console.warn).toHaveBeenCalledWith('warn');
        log.info('info');
        t.e(console.info).not.toHaveBeenCalledWith('info');
      }));

      t.it('LEVEL_1: info only', t.inject([LogService], (log: LogService) => {
        Config.DEBUG.LEVEL_1 = true;

        log.debug('debug');
        t.e(console.log).not.toHaveBeenCalledWith('debug');
        log.error('error');
        t.e(console.error).not.toHaveBeenCalledWith('error');
        log.warn('warn');
        t.e(console.warn).not.toHaveBeenCalledWith('warn');
        log.info('info');
        t.e(console.info).toHaveBeenCalledWith('info');
      }));
    });
  });

}
