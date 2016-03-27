import * as electron from 'electron';
import {ElectronMessageBus, ElectronMessageBusSink, ElectronMessageBusSource, ELECTRON_READY} from './electron_message_bus';
import {ELECTRON_APP_APPLICATION_COMMON, ELECTRON_APP_PLATFORM} from './electron_app_common';
import {Parse5DomAdapter} from 'angular2/src/platform/server/parse5_adapter';
import {APP_INITIALIZER, platform, NgZone, Provider, Injector} from 'angular2/core';
import {MessageBus} from 'angular2/src/web_workers/shared/message_bus';
import {COMPILER_PROVIDERS} from 'angular2/compiler';
import {BrowserPlatformLocation} from 'angular2/src/router/location/browser_platform_location';
import {MessageBasedPlatformLocation} from 'angular2/src/web_workers/ui/platform_location';

// experiment
import {ROUTER_PROVIDERS} from 'angular2/router';

/* mock */
import {UrlChangeListener, PlatformLocation} from 'angular2/src/router/location/platform_location';

class BrowserPlatformLocationMock extends PlatformLocation {
  private _location: any;
  private _history: any;

  constructor() {
    super();
    this._init();
  }

  // This is moved to its own method so that `MockPlatformLocationStrategy` can overwrite it
  /** @internal */
  _init() {
    // this._location = DOM.getLocation();
    // this._history = DOM.getHistory();
    this._location = {
      pathname: '',
      search: '',
      hash: ''
    }
    this._history = {
      forward: () => {
        return;
      },
      back: () => {
        return;
      },
      pushState: (state: any, title: any, url: any) => {
        return;
      },
      replaceState: (state: any, title: any, url: any) => {
        return;
      }
    }
  }

  /** @internal */
  get location(): any { return this._location; }

  getBaseHrefFromDOM(): string { return ''; }//DOM.getBaseHref(); }

  onPopState(fn: UrlChangeListener): void {
    // DOM.getGlobalEventTarget('window').addEventListener('popstate', fn, false);
  }

  onHashChange(fn: UrlChangeListener): void {
    // DOM.getGlobalEventTarget('window').addEventListener('hashchange', fn, false);
  }

  get pathname(): string { return this._location.pathname; }
  get search(): string { return this._location.search; }
  get hash(): string { return this._location.hash; }
  set pathname(newPath: string) { this._location.pathname = newPath; }

  pushState(state: any, title: string, url: string): void {
    this._history.pushState(state, title, url);
  }

  replaceState(state: any, title: string, url: string): void {
    this._history.replaceState(state, title, url);
  }

  forward(): void { this._history.forward(); }

  back(): void { this._history.back(); }
}
/* mock end */

export const ELECTRON_APP_APPLICATION: Array<any /*Type | Provider | any[]*/> = [
  ELECTRON_APP_APPLICATION_COMMON,
  COMPILER_PROVIDERS,
  new Provider(MessageBus, { useFactory: createMessageBus, deps: [NgZone] }),

  ROUTER_PROVIDERS,
  new Provider(BrowserPlatformLocation, { useClass: BrowserPlatformLocationMock }),
  MessageBasedPlatformLocation,
  new Provider(APP_INITIALIZER, { useFactory: initRouterListeners, multi: true, deps:[Injector] })
];

let applicationRef:Electron.BrowserWindow;

function initRouterListeners(injector: Injector): () => void {
  return () => {
    let zone = injector.get(NgZone);

    zone.run(() => injector.get(MessageBasedPlatformLocation).start());
  };
}

function createMessageBus(zone: NgZone): MessageBus {
  let sink = new ElectronMessageBusSink(applicationRef.webContents);
  let source = new ElectronMessageBusSource(electron.ipcMain);
  let bus = new ElectronMessageBus(sink, source);
  bus.attachToZone(zone);
  return bus;
}

function waitForAppReady() {
  return new Promise((resolve, reject) => {
    electron.app.on('ready', resolve);
  });
}

function waitForPingback() {
  initializeMainWindow();
  return new Promise((resolve) => {
    electron.ipcMain.once(ELECTRON_READY, (ev: any) => {
      console.log('ELECTRON_READY');
      ev.returnValue = 'ok';
      resolve();
    });
  });
}

function initializeMainWindow() {
  applicationRef = new electron.BrowserWindow();
  applicationRef.loadURL(`file://${process.cwd()}/dist/dev/index.html`);
}

export function bootstrap(appComp: any, providers?: any) {
  Parse5DomAdapter.makeCurrent();
  
  return platform([ELECTRON_APP_PLATFORM])
    .asyncApplication((z) => {
      return z.run(() => {
        return waitForAppReady()
          .then(waitForPingback)
          .then(() => {
            return new Promise((resolve) => {
              resolve(ELECTRON_APP_APPLICATION);
            });
          });
      });
    })
    .then((appRef) => {
      console.log('appRef trying to bootstrap this component:');
      console.log(appComp);
      return appRef.bootstrap(appComp, providers);
    });

}
