import { Provider, FactoryProvider } from '@angular/core';
// angular
import { TestBed } from '@angular/core/testing';

// app
import { t } from '../../../test/index';

// module
import { Config } from '../../utils/index';
import { ConsoleService, LogService, LogTarget, ConsoleTarget, LogLevel, provideConsoleTarget, LogTargetBase, LogEvent } from '../../services/index';

const secondTarget = new class extends LogTargetBase {
  constructor() {
    super({ minLogLevel: LogLevel.Info });
  }
  writeToLog(log: LogEvent) {
    return Promise.resolve();
  }
};

const providers: Array<Provider> = [
  { provide: ConsoleService, useValue: console },
  provideConsoleTarget(LogLevel.Debug),
  { provide: LogTarget, useValue: secondTarget, multi: true },
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
        t.e(console.log).not.toHaveBeenCalledWith(['debug']);
        log.error('error');
        t.e(console.error).not.toHaveBeenCalledWith(['error']);
        log.warn('warn');
        t.e(console.warn).not.toHaveBeenCalledWith(['warn']);
        log.info('info');
        t.e(console.info).not.toHaveBeenCalledWith(['info']);
      }));
    });

    t.describe('debug levels', () => {

      t.be(() => {
        Config.RESET();
      });

      t.it('LEVEL_4: everything', t.inject([LogService], (log: LogService) => {
        Config.DEBUG.LEVEL_4 = true;

        log.debug('debug');
        t.e(console.log).toHaveBeenCalledWith(['debug']);
        log.error('error');
        t.e(console.error).toHaveBeenCalledWith(['error']);
        log.warn('warn');
        t.e(console.warn).toHaveBeenCalledWith(['warn']);
        log.info('info');
        t.e(console.info).toHaveBeenCalledWith(['info']);
      }));

      t.it('LEVEL_3: error only', t.inject([LogService], (log: LogService) => {
        Config.DEBUG.LEVEL_3 = true;

        log.debug('debug');
        t.e(console.log).not.toHaveBeenCalledWith(['debug']);
        log.error('error');
        t.e(console.error).toHaveBeenCalledWith(['error']);
        log.warn('warn');
        t.e(console.warn).not.toHaveBeenCalledWith(['warn']);
        log.info('info');
        t.e(console.info).not.toHaveBeenCalledWith(['info']);

        // always overrides lower levels and allows them to come through
        Config.DEBUG.LEVEL_4 = true;

        log.debug('debug w/level_4');
        t.e(console.log).toHaveBeenCalledWith(['debug w/level_4']);
        log.error('error w/level_4');
        t.e(console.error).toHaveBeenCalledWith(['error w/level_4']);
        log.warn('warn w/level_4');
        t.e(console.warn).toHaveBeenCalledWith(['warn w/level_4']);
        log.info('info w/level_4');
        t.e(console.info).toHaveBeenCalledWith(['info w/level_4']);
      }));

      t.it('LEVEL_2: warn only', t.inject([LogService], (log: LogService) => {
        Config.DEBUG.LEVEL_2 = true;

        log.debug('debug');
        t.e(console.log).not.toHaveBeenCalledWith(['debug']);
        log.error('error');
        t.e(console.error).not.toHaveBeenCalledWith(['error']);
        log.warn('warn');
        t.e(console.warn).toHaveBeenCalledWith(['warn']);
        log.info('info');
        t.e(console.info).not.toHaveBeenCalledWith(['info']);
      }));

      t.it('LEVEL_1: info only', t.inject([LogService], (log: LogService) => {
        Config.DEBUG.LEVEL_1 = true;

        log.debug('debug');
        t.e(console.log).not.toHaveBeenCalledWith(['debug']);
        log.error('error');
        t.e(console.error).not.toHaveBeenCalledWith(['error']);
        log.warn('warn');
        t.e(console.warn).not.toHaveBeenCalledWith(['warn']);
        log.info('info');
        t.e(console.info).toHaveBeenCalledWith(['info']);
      }));
    });

    t.describe('second target', () => {
      t.be(() => {
        t.spyOn(secondTarget, 'writeToLog');
        Config.RESET();
      });

      t.it('should log entries higher than debug', t.inject([LogService], (log: LogService) => {
        Config.DEBUG.LEVEL_4 = true;
        log.debug('debug');
        t.e(secondTarget.writeToLog).not.toHaveBeenCalled();
        log.info('info');
        t.e(secondTarget.writeToLog).toHaveBeenCalledWith(<LogEvent>{ level: LogLevel.Info, message: ['info'] });
        log.warn('warning');
        t.e(secondTarget.writeToLog).toHaveBeenCalledWith(<LogEvent>{ level: LogLevel.Warning, message: ['warning'] });
        log.error('error');
        t.e(secondTarget.writeToLog).toHaveBeenCalledWith(<LogEvent>{ level: LogLevel.Error, message: ['error'] });
      }));
    });
  });

}
