// angular
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

// libs
import { ConfigModule, ConfigLoader, ConfigService } from 'ng2-config';

// app
import { t } from '../../test/index';
import { configFactory } from '../../core/core.module';

// module
import { ConsoleService, LogService } from '../index';

const providers: Array<any> = [
  { provide: ConsoleService, useValue: console },
  LogService,
  {
    provide: Http,
    useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
      return new Http(mockBackend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
  },
  MockBackend,
  BaseRequestOptions
];

const mockBackendResponse = (connection: MockConnection, response: any) => {
    connection.mockRespond(new Response(new ResponseOptions({ body: response })));
};

export function main() {
  t.describe('core: LogService', () => {

    t.be(() => {
      // spy
      t.spyOn(console, 'log');
      t.spyOn(console, 'error');
      t.spyOn(console, 'warn');
      t.spyOn(console, 'info');

      // reset the test environment before initializing it.
      TestBed.resetTestEnvironment();

      TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
        .configureTestingModule({
          imports: [
            ConfigModule.forRoot({ provide: ConfigLoader, useFactory: (configFactory) })
          ],
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

      t.it('should not log anything by default',
        t.async(t.inject([MockBackend, ConfigService, LogService],
          (backend: MockBackend, config: ConfigService, log: LogService) => {
            const mockSettings = {
              logging: {
                DEBUG: {
                  LEVEL_1: false,
                  LEVEL_2: false,
                  LEVEL_3: false,
                  LEVEL_4: false
                }
              }
            };

            // mock response
            backend.connections.subscribe((c: MockConnection) => mockBackendResponse(c, mockSettings));

            config.init()
              .then(() => {
                log.debug('debug');
                t.e(console.log).not.toHaveBeenCalledWith('debug');
                log.error('error');
                t.e(console.error).not.toHaveBeenCalledWith('error');
                log.warn('warn');
                t.e(console.warn).not.toHaveBeenCalledWith('warn');
                log.info('info');
                t.e(console.info).not.toHaveBeenCalledWith('info');
              });
      })));
    });

    t.describe('debug levels', () => {
      t.it('LEVEL_4: everything',
        t.async(t.inject([MockBackend, ConfigService, LogService],
          (backend: MockBackend, config: ConfigService, log: LogService) => {
            const mockSettings = {
              logging: {
                DEBUG: {
                  LEVEL_1: false,
                  LEVEL_2: false,
                  LEVEL_3: false,
                  LEVEL_4: true
                }
              }
            };

            // mock response
            backend.connections.subscribe((c: MockConnection) => mockBackendResponse(c, mockSettings));

            config.init()
              .then(() => {
                log.debug('debug');
                t.e(console.log).toHaveBeenCalledWith('debug');
                log.error('error');
                t.e(console.error).toHaveBeenCalledWith('error');
                log.warn('warn');
                t.e(console.warn).toHaveBeenCalledWith('warn');
                log.info('info');
                t.e(console.info).toHaveBeenCalledWith('info');
              });
      })));

      t.it('LEVEL_3: error only',
        t.async(t.inject([MockBackend, ConfigService, LogService],
          (backend: MockBackend, config: ConfigService, log: LogService) => {
            const mockSettings = {
              logging: {
                DEBUG: {
                  LEVEL_1: false,
                  LEVEL_2: false,
                  LEVEL_3: true,
                  LEVEL_4: false
                }
              }
            };

            // mock response
            backend.connections.subscribe((c: MockConnection) => mockBackendResponse(c, mockSettings));

            config.init()
              .then(() => {
                log.debug('debug');
                t.e(console.log).not.toHaveBeenCalledWith('debug');
                log.error('error');
                t.e(console.error).toHaveBeenCalledWith('error');
                log.warn('warn');
                t.e(console.warn).not.toHaveBeenCalledWith('warn');
                log.info('info');
                t.e(console.info).not.toHaveBeenCalledWith('info');

                // always overrides lower levels and allows them to come through
                mockSettings.logging.DEBUG.LEVEL_4 = true;

                config.init()
                  .then(() => {
                    log.debug('debug w/level_4');
                    t.e(console.log).toHaveBeenCalledWith('debug w/level_4');
                    log.error('error w/level_4');
                    t.e(console.error).toHaveBeenCalledWith('error w/level_4');
                    log.warn('warn w/level_4');
                    t.e(console.warn).toHaveBeenCalledWith('warn w/level_4');
                    log.info('info w/level_4');
                    t.e(console.info).toHaveBeenCalledWith('info w/level_4');
                  });
              });
      })));

      t.it('LEVEL_2: warn only',
        t.async(t.inject([MockBackend, ConfigService, LogService],
          (backend: MockBackend, config: ConfigService, log: LogService) => {
            const mockSettings = {
              logging: {
                DEBUG: {
                  LEVEL_1: false,
                  LEVEL_2: true,
                  LEVEL_3: false,
                  LEVEL_4: false
                }
              }
            };

            // mock response
            backend.connections.subscribe((c: MockConnection) => mockBackendResponse(c, mockSettings));

            config.init()
              .then(() => {
                log.debug('debug');
                t.e(console.log).not.toHaveBeenCalledWith('debug');
                log.error('error');
                t.e(console.error).not.toHaveBeenCalledWith('error');
                log.warn('warn');
                t.e(console.warn).toHaveBeenCalledWith('warn');
                log.info('info');
                t.e(console.info).not.toHaveBeenCalledWith('info');
              });
      })));

      t.it('LEVEL_1: info only',
        t.async(t.inject([MockBackend, ConfigService, LogService],
          (backend: MockBackend, config: ConfigService, log: LogService) => {
            const mockSettings = {
              logging: {
                DEBUG: {
                  LEVEL_1: true,
                  LEVEL_2: false,
                  LEVEL_3: false,
                  LEVEL_4: false
                }
              }
            };

            // mock response
            backend.connections.subscribe((c: MockConnection) => mockBackendResponse(c, mockSettings));

            config.init()
              .then(() => {
                log.debug('debug');
                t.e(console.log).not.toHaveBeenCalledWith('debug');
                log.error('error');
                t.e(console.error).not.toHaveBeenCalledWith('error');
                log.warn('warn');
                t.e(console.warn).not.toHaveBeenCalledWith('warn');
                log.info('info');
                t.e(console.info).toHaveBeenCalledWith('info');
              });
      })));
    });
  });
}
