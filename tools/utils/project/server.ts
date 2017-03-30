import * as express from 'express';
import { Application } from 'express';
import { SeedWebServer } from '../seed/server';


export class ProjectWebServer extends SeedWebServer {
  // Override and modify the server code in this class.

  /**
   * This method is called once regardless of how the server is started, and this
   * is the starting point of the project's custom server code.
   */
  public startServer() {
    super.startServer();

    // Add project server startup code here.
  }
}

let app: Application = express();
let webServer = new ProjectWebServer(app);
export default webServer;
export function serveSPA() { webServer.serveSPA(); }
export function notifyLiveReload(e: any) { webServer.notifyLiveReload(e); }
export function serveDocs() { webServer.serveDocs(); }
export function serveCoverage() { webServer.serveCoverage(); }
export function serveProd() { webServer.serveProd(); }
