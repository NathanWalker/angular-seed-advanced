import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';
import { APP_SRC } from '../../config';

const plugins = <any>gulpLoadPlugins();

/**
 * Compile SASS into minified CSS
 * @requires gulp-sass
 * @requires gulp-plumber
 * @requires gulp-autoprefixer
 */
export = () => {
  return gulp.src(join(APP_SRC, '**', '*.scss'))
    .pipe(plugins.plumber())
    .pipe(plugins.sass({outputStyle: 'nested'}).on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({browsers:['last 3 versions', 'IE 11']}).on('error', plugins.sass.logError))
    .pipe(gulp.dest(APP_SRC));
};
