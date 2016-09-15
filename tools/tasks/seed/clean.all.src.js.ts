import * as chalk from 'chalk';
import { lstatSync, readdirSync } from 'fs';
import * as util from 'gulp-util';
import * as rimraf from 'rimraf';
import { join } from 'path';

import Config from '../../config';

/**
 * Executes the build process, deleting all JavaScript and Source Map files (which were transpiled from the TypeScript sources) with in
 * the `src/client` directory.
 */
export = (done: any) => {
  deleteAndWalk(Config.APP_SRC);
  done();
};

/**
 * Recursively walks along the given path and deletes all JavaScript files.
 * @param {any} path - The path to walk and clean.
 */
function walk(path: any) {
  let files = readdirSync(path);
  for (let i = 0; i < files.length; i += 1) {
    let curPath = join(path, files[i]);
    if (lstatSync(curPath).isDirectory()) { // recurse
      deleteAndWalk(curPath);
    }
  }
}

/**
 * Deletes the JavaScript file with the given path.
 * @param {any} path - The path of the JavaScript file to be deleted.
 */
function deleteAndWalk(path: any) {
  try {
    rimraf.sync(join(path, '*.js'));
    util.log('Deleted', chalk.yellow(`${path}/*.js`));
    rimraf.sync(join(path, '*.js.map'));
    util.log('Deleted', chalk.yellow(`${path}/*.js.map`));
 } catch (e) {
    util.log('Error while deleting', chalk.yellow(`${path}/*.js`), e);
  }
  walk(path);
}
