import * as gulp from 'gulp';
import { join } from 'path';

import Config from '../../config';

export = () => {
  let src = [
    join(Config.APP_SRC, 'package.json')
  ];
  return gulp.src(src)
    .pipe(gulp.dest(Config.APP_DEST));
};
