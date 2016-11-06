import * as gulp from 'gulp';
import { join } from 'path';

import { AssetsTask } from '../assets_task';
import Config from '../../config';

/**
 * Executes the build process, copying the assets located in `src/client` over to the appropriate
 * `dist/dev` directory.
 */
export =
  class BuildAssetsTask extends AssetsTask {
    run() {
      let paths: string[] = [
        join(Config.APP_MVC_SRC, 'Views', '**')
      ]

      return gulp.src(paths)
        .pipe(gulp.dest(join(Config.APP_MVC_DEST, 'Views')));
    }
  };