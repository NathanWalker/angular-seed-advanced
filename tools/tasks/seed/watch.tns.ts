import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import * as runSequence from 'run-sequence';

import Config from '../../config';
import { changeFileManager } from '../../utils/seed/code_change_tools';
import { notifyLiveReload } from '../../utils';
const plugins = <any>gulpLoadPlugins();

const taskname = 'build.tns';

export = function watch() {
  const paths: string[] = [
    `${Config.TNS_APP_SRC}/**/*.tns.*`,
    `${Config.TNS_APP_SRC}/app/**/*.tns.*`,
    `${Config.TNS_APP_SRC}/**/*.ts`,
    `${Config.TNS_APP_SRC}/app/**/*.ts`,
    `${Config.TNS_APP_SRC}/**/*.css`,
    `${Config.TNS_APP_SRC}/app/**/*.css`,
    `${Config.TNS_APP_SRC}/**/*.scss`,
    `${Config.TNS_APP_SRC}/app/**/*.scss`,
    `!${Config.TNS_APP_SRC}/**/*.component.css`,
    `!${Config.TNS_APP_SRC}/**/*.component.scss`,
    `!${Config.TNS_APP_SRC}/**/*.component.html`,
  ];

  plugins.watch(paths, (e: any) => {
    changeFileManager.addFile(e.path);

    runSequence(taskname, () => {
      changeFileManager.clear();

      notifyLiveReload(e);
    });
  });
}
