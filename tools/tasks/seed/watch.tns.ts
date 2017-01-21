import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as runSequence from 'run-sequence';

import Config from '../../config';
import { changeFileManager } from '../../utils/seed/code_change_tools';
import { notifyLiveReload } from '../../utils';
const plugins = <any>gulpLoadPlugins();

const taskname = 'build.tns';

export = function watch() {
  const paths: string[] = [
    `${Config.ASSETS_SRC}/**/*`,
    `${Config.TNS_APP_SRC}/**/*`,
    `${Config.TNS_APP_SRC}/app/*`,
    `${Config.TNS_APP_SRC}/app/**/*`,
    `!${Config.TNS_APP_SRC}/app/*.component.css`,
    `!${Config.TNS_APP_SRC}/app/*.component.scss`,
    `!${Config.TNS_APP_SRC}/app/*.component.html`,
  ];

  plugins.watch(paths, (e: any) => {
    changeFileManager.addFile(e.path);

    runSequence(taskname, () => {
      changeFileManager.clear();

      notifyLiveReload(e);
    });
  });
};
