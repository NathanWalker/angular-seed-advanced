import * as gulp from 'gulp';
import { join } from 'path';
var newer = require('gulp-newer');

import Config from '../../config';

/**
 * Executes the build process, copying the assets located in `src/client` over to the appropriate
 * `dist/dev` directory.
 */
export = () => {
  let paths: string[] = [
    join(Config.APP_SRC, '**'),
    '!' + join(Config.APP_SRC, '**', '*.ts'),
    '!' + join(Config.APP_SRC, '**', '*.scss')
  ].concat(Config.TEMP_FILES.map((p) => { return '!' + p; }));

  return gulp.src(paths)
    // .pipe(newer({
    //   dest: Config.APP_DEST, 
    //   map: function(path: String) { return path.replace(".ts", ".js").replace(".sccs", ".css"); }
    // }))
    .pipe(gulp.dest(Config.APP_DEST));
};
