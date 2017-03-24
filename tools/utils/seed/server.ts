import * as express from 'express';
import * as fallback from 'express-history-api-fallback';
import * as openResource from 'open';
import { resolve } from 'path';

import * as codeChangeTool from './code_change_tools';
import Config from '../../config';

/**
 * Subclass this seed web server in your project/server.ts
 */
export class SeedWebServer {

  protected portMain: number = Config.PORT;
  protected portDocs: number = Config.DOCS_PORT;
  protected portCoverage: number = Config.COVERAGE_PORT;
  protected baseDirApp: string = Config.APP_BASE;
  protected baseDirDocs: string = Config.DOCS_DEST;
  protected baseDirCoverage: string = Config.COVERAGE_TS_DIR;
  protected baseDirProd: string = Config.PROD_DEST;
  protected startupBanner: string = Config.SERVER_STARTUP_BANNER;

  /**
   * @param app - express application.
   */
  constructor(protected app: express.Express) {
    this.configureMiddleware();
  }

  public showStartupBanner() {
    console.info(this.startupBanner);
  }

  /**
   * Serves the Single Page Application. More specifically, calls the `listen` method, which itself launches BrowserSync.
   * This is used by the server.start gulp task.
   */
  public serveSPA() {
    this.showStartupBanner();
    codeChangeTool.listen();
  }

  /**
   * This utility method is used to notify that a file change has happened and subsequently calls the `changed` method,
   * which itself initiates a BrowserSync reload.
   * This is used by the start.deving, watch, and watch.tns gulp tasks.
   * @param {any} e - The file that has changed.
   */
  public notifyLiveReload(e: any) {
    let fileName = e.path;
    this.showStartupBanner();
    codeChangeTool.changed(fileName);
  }

  /**
   * Begins serving the static documentation files over the express server.
   * This is used by the serve.docs gulp task.
   */
  public serveDocs() {
    this.showStartupBanner();

    this.app.use(
      this.baseDirApp,
      express.static(resolve(process.cwd(), this.baseDirDocs))
    );

    this.app.listen(this.portDocs, () =>
      openResource('http://localhost:' + this.portDocs + this.baseDirApp)
    );
  }

  /**
   * Begins serving the static unit test code coverage report over the express server.
   * This is used by the serve.coverage gulp task.
   */
  public serveCoverage() {
    this.showStartupBanner();

    this.app.use(
      this.baseDirApp,
      express.static(resolve(process.cwd(), this.baseDirCoverage))
    );

    this.app.listen(this.portCoverage, () =>
      openResource('http://localhost:' + this.portCoverage + this.baseDirApp)
    );
  }

  /**
   * Begins serving the built files from `dist/prod` over the express server.
   * This is used by the serve.prod gulp task.
   */
  public serveProd() {
    this.showStartupBanner();
    let root = resolve(process.cwd(), this.baseDirProd);

    for (let proxy of Config.getProxyMiddleware()) {
      this.app.use(proxy);
    }

    this.app.use(this.baseDirApp, express.static(root));

    this.app.use(fallback('index.html', { root }));

    this.app.listen(this.portMain, () =>
      openResource('http://localhost:' + this.portMain + this.baseDirApp)
    );
  };

  /**
   * Configure the server's application request handler(s) such as a request logger.
   * None, by default.
   */
  protected configureMiddleware() {
    // Add custom request handlers here.
  }
}
