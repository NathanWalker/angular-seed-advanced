import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import * as util from 'gulp-util';
import * as rename from 'gulp-rename';

import Config from '../../config';
import { CssTask } from '../css_task';

const plugins = <any>gulpLoadPlugins();
const reportPostCssError = (e: any) => util.log(util.colors.red(e.message));

function renamer() {
  return rename((path: any) => {
    path.basename = path.basename.replace(/\.tns/, '');
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
    .pipe(gulp.dest(Config.TNS_APP_DEST));
}

/**
 * Process scss files referenced from Angular component `styleUrls` metadata
 */
function processComponentScss() {
  // let {N} handle via nativescript-dev-sass plugin
  const stream = gulp.src([
    '**/*.scss',
    'app/**/*.scss',
    '!app/**/*.component.scss',
  ], {
      base: Config.TNS_APP_SRC,
      cwd: Config.TNS_APP_SRC,
    });
    // .pipe(plugins.sourcemaps.init())
    // .pipe(plugins.sass(Config.getPluginConfig('gulp-sass-tns')).on('error', plugins.sass.logError))
    // .pipe(plugins.sourcemaps.write());

  return stream
    .pipe(renamer())
    .pipe(gulp.dest(Config.TNS_APP_DEST));
}

function handlePlatformSpecificFiles() {
  // Make a copy of platform specific files were ext is swapped with platform-name
  // This is to support both our webpack --bundle and livesync builds
  const platformRegexp = /(\.ios|\.android)/;

  return gulp.src([
    // '**/*.ios.css',
    '**/*.ios.html',
    '**/*.ios.js',

    // '**/*.android.css',
    '**/*.android.html',
    '**/*.android.js',
  ], {
    base: Config.TNS_APP_DEST,
    cwd: Config.TNS_APP_DEST,
  })
    .pipe(rename((path) => {
      const match = path.basename.match(platformRegexp);
      if (match) {
        const oldExt = path.extname;
        path.extname = match[1];
        path.basename = path.basename.replace(platformRegexp, oldExt);
      }
    }))
    .pipe(gulp.dest((Config.TNS_APP_DEST)));
}

export =
  class BuildTNSCSS extends CssTask {
    shallRun(files: String[]) {
      // Only run if tns-resources
      return files.some((f) =>
                          // // tns.html, tns.scss or tns.css under nativescript/src/app
                          // (f.indexOf('nativescript/src/app') !== -1 && !!f.match(/\.tns\.(s?css|html)$/)) ||
                          // // .html, .scss or .css NOT under nativescript/src/app
                          // (f.indexOf('nativescript/src/app') === -1 && !!f.match(/\.(s?css|html)$/))

                          // tns.html under nativescript/src/app
                          (f.indexOf('nativescript/src/app') !== -1 && !!f.match(/\.tns\.(html)$/)) ||
                          // .html NOT under nativescript/src/app
                          (f.indexOf('nativescript/src/app') === -1 && !!f.match(/\.(html)$/))
                       );
    }

    run() {
      return merge(processComponentStylesheets(), prepareTemplates()).on('end', () => handlePlatformSpecificFiles());
    }
  };

