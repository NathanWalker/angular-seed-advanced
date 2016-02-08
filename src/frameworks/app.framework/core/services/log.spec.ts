import {provide} from 'angular2/core';

import {t} from '../../../test.framework/_providers';
import {AppConfig} from './app-config';
import {Console} from './console';
import {Log} from './log';

const providers: any[] = [
  provide(Console, { useValue: console }),
  Log
];

export function main() {
  t.describe('app.framework: Log', () => {
    
    t.be(() => {
      // ensure statics are in default state
      AppConfig.RESET();
      // spy
      spyOn(console, 'log');
      spyOn(console, 'error');
      spyOn(console, 'warn');
      spyOn(console, 'info');
    });
    
    t.describe('api', () => {
      
      t.bep(() => providers);
      
      t.it('sanity', t.inject([Log], (log) => {
        t.e(log.o).toBeDefined();
        t.e(log.error).toBeDefined();
        t.e(log.warn).toBeDefined();
        t.e(log.info).toBeDefined();
      }));
      
      t.it('should not log anything by default', t.inject([Log], (log) => {
        log.o('out');
        t.e(console.log).not.toHaveBeenCalledWith('out');
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
        AppConfig.RESET();
      });
      
      t.bep(() => providers);
      
      t.it('LEVEL_4: everything', t.inject([Log], (log) => {
        AppConfig.DEBUG.LEVEL_4 = true;
        
        log.o('out');
        t.e(console.log).toHaveBeenCalledWith('out');
        log.error('error');
        t.e(console.error).toHaveBeenCalledWith('error');
        log.warn('warn');
        t.e(console.warn).toHaveBeenCalledWith('warn');
        log.info('info');
        t.e(console.info).toHaveBeenCalledWith('info');
      }));
      
      t.it('LEVEL_3: error only', t.inject([Log], (log) => {
        AppConfig.DEBUG.LEVEL_3 = true;

        log.o('out');
        t.e(console.log).not.toHaveBeenCalledWith('out');
        log.error('error');
        t.e(console.error).toHaveBeenCalledWith('error');
        log.warn('warn');
        t.e(console.warn).not.toHaveBeenCalledWith('warn');
        log.info('info');
        t.e(console.info).not.toHaveBeenCalledWith('info');
        
        // always overrides lower levels and allows them to come through
        AppConfig.DEBUG.LEVEL_4 = true;

        log.o('out w/level_4');
        t.e(console.log).toHaveBeenCalledWith('out w/level_4');
        log.error('error w/level_4');
        t.e(console.error).toHaveBeenCalledWith('error w/level_4');
        log.warn('warn w/level_4');
        t.e(console.warn).toHaveBeenCalledWith('warn w/level_4');
        log.info('info w/level_4');
        t.e(console.info).toHaveBeenCalledWith('info w/level_4');
      }));
      
      t.it('LEVEL_2: warn only', t.inject([Log], (log) => {
        AppConfig.DEBUG.LEVEL_2 = true;

        log.o('out');
        t.e(console.log).not.toHaveBeenCalledWith('out');
        log.error('error');
        t.e(console.error).not.toHaveBeenCalledWith('error');
        log.warn('warn');
        t.e(console.warn).toHaveBeenCalledWith('warn');
        log.info('info');
        t.e(console.info).not.toHaveBeenCalledWith('info');
      }));
      
      t.it('LEVEL_1: info only', t.inject([Log], (log) => {
        AppConfig.DEBUG.LEVEL_1 = true;

        log.o('out');
        t.e(console.log).not.toHaveBeenCalledWith('out');
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
