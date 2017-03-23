import * as express from 'express';
import { SeedWebServer } from '../seed/server';

class ProjectWebServer extends SeedWebServer {
  // Override and modify the server code here.
}

let app: express.Express = express();
export let webServer: ProjectWebServer = new ProjectWebServer(app);
export function serveSPA() { webServer.serveSPA(); }
export function notifyLiveReload(e: any) { webServer.notifyLiveReload(e); }
export function serveDocs() { webServer.serveDocs(); }
export function serveCoverage() { webServer.serveCoverage(); }
export function serveProd() { webServer.serveProd(); }
