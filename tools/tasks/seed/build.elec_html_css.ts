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
    path.basename = path.basename.replace(/\.elec/, '');
  });
}

function prepareTemplates() {
  return gulp.src([
    '**/*.html',
    'app/**/*.html',
    '!app/**/*.component.html',
  ], {
    base: Config.ELECTRON_APP_SRC,
    cwd: Config.ELECTRON_APP_SRC,
  })
    .pipe(renamer())
    .pipe(gulp.dest(Config.ELECTRON_APP_DEST));
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
    base: Config.ELECTRON_APP_SRC,
    cwd: Config.ELECTRON_APP_SRC,
  })
    .pipe(renamer())
    //.on('error', reportPostCssError) // Causes Property 'pipe' does not exist on type 'EventEmitter'.
    .pipe(gulp.dest(Config.ELECTRON_APP_DEST));
}

/**
 * Process scss files referenced from Angular component `styleUrls` metadata
 */
function processComponentScss() {
  const stream = gulp.src([
    '**/*.scss',
    'app/**/*.scss',
    '!app/**/*.component.scss',
  ], {
    base: Config.ELECTRON_APP_SRC,
    cwd: Config.ELECTRON_APP_SRC,
  })
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass(Config.getPluginConfig('gulp-sass-tns')).on('error', plugins.sass.logError))
    .pipe(plugins.sourcemaps.write());

  return stream
    .pipe(renamer())
    .pipe(gulp.dest(Config.ELECTRON_APP_DEST));
}

export =
  class BuildElectronCSS extends CssTask {
    shallRun(files: String[]) {
      // Only run if tns-resources
      return files.some((f) =>
                          // tns.html, tns.scss or tns.css under nativescript/src/app
                          (f.indexOf('electron/src/app') !== -1 && !!f.match(/\.elec\.(s?css|html)$/)) ||
                          // .html, .scss or .css NOT under nativescript/src/app
                          (f.indexOf('electron/src/app') === -1 && !!f.match(/\.(s?css|html)$/))
                       );
    }

    run() {
      return merge(processComponentStylesheets(), prepareTemplates());
    }
  };
