import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import { APP_SRC } from '../../config';

const plugins = <any>gulpLoadPlugins();

/**
 * Lint SASS files
 * @requires gulp-scss-lint
 */
export = () => {
  return gulp.src(join(APP_SRC, '**', '*.scss'))
    .pipe(plugins.scssLint());
};
