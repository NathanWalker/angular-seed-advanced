import * as gulp from 'gulp';
import { join } from 'path';

import { APP_DEST, APP_SRC } from '../../config';

export = () => {
  let src = [
    join(APP_SRC, 'package.json')
  ];
  return gulp.src(src)
    .pipe(gulp.dest(APP_DEST));
};
