import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import * as util from 'gulp-util';
import * as rename from 'gulp-rename';
import * as newer from 'gulp-newer';
import { join } from 'path';

import Config from '../../config';
import { CssTask } from '../css_task';

const plugins = <any>gulpLoadPlugins();
const reportPostCssError = (e: any) => util.log(util.colors.red(e.message));

function renamer() {
  const platformRegexp = /(\.ios|\.android)/;
  return rename((path: any) => {
    path.basename = path.basename.replace(/\.tns/, '');
    const match = path.basename.match(platformRegexp);
    if (match) {
      const oldExt = path.extname;
      path.extname = match[1];
      path.basename = path.basename.replace(platformRegexp, oldExt);
    }
  });
}

function prepareTemplates() {
  return gulp.src([
    '**/*.html',
    'app/**/*.html',
    '!app/**/*.component.html',
  ], {
    base: Config.TNS_APP_SRC,
    cwd: Config.TNS_APP_SRC,
  })
    .pipe(renamer())
    .pipe(newer(Config.TNS_APP_DEST))
    .pipe(gulp.dest(Config.TNS_APP_DEST));
}

function processComponentStylesheets() {
  return Config.ENABLE_SCSS ?
    merge(
      processComponentScss(),
      processComponentCss())
    :
    processComponentCss();
}

function processComponentCss() {
  return gulp.src([
    '**/*.css',
    'app/**/*.css',
    '!app/**/*.component.css',
  ], {
    base: Config.TNS_APP_SRC,
    cwd: Config.TNS_APP_SRC,
  })
  .pipe(renamer())
  .on('error', reportPostCssError)
  .pipe(newer(Config.TNS_APP_DEST))
  .pipe(gulp.dest(Config.TNS_APP_DEST));
}

/**
 * Process scss files referenced from Angular component `styleUrls` metadata
 */
function processComponentScss() {
  let stream = gulp.src([
    '**/*.scss',
    'app/**/*.scss',
    '!app/**/*.component.scss',
  ], {
    base: Config.TNS_APP_SRC,
    cwd: Config.TNS_APP_SRC,
  })
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass(Config.getPluginConfig('gulp-sass-tns')).on('error', plugins.sass.logError))
    .pipe(plugins.sourcemaps.write('', {
      sourceMappingURL: (file: any) => {
        // write absolute urls to the map files
        return `${Config.TNS_APP_DEST}/${file.relative}.map`;
      }
    }));

  return stream
    .pipe(renamer())
    .pipe(newer(Config.TNS_APP_DEST))
    .pipe(gulp.dest(Config.TNS_APP_DEST));
}

export =
  class BuildTNSCSS extends CssTask {
    run() {
      return merge(processComponentStylesheets(), prepareTemplates());
    }
  };

