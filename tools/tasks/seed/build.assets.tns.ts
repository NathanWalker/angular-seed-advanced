import * as gulp from 'gulp';
import * as merge from 'merge-stream';
import { join } from 'path';
import * as newer from 'gulp-newer';

import { AssetsTask } from '../assets_task';
import Config from '../../config';

function copyFiles(paths: string[], subdir: string) {
  const dest = join(Config.TNS_APP_DEST, subdir);

  return gulp.src(paths)
    .pipe(newer(dest))
    .pipe(gulp.dest(dest));
}

function copyAssets() {
  const paths: string[] = [
    join(Config.APP_SRC, 'assets', '**'),
    '!' + join(Config.APP_SRC, 'assets', 'icons', '**', '*'),
  ].concat(Config.TEMP_FILES.map((p) => { return '!' + p; }));

  return copyFiles(paths, 'assets');
}

function copyAppResources() {
  const paths: string[] = [
    join(Config.TNS_APP_SRC, 'App_Resources', '**'),
  ];

  return copyFiles(paths, 'App_Resources');
}

function copyAppFonts() {
  const paths: string[] = [
    join(Config.TNS_APP_SRC, 'fonts', '**', '*.otf'),
    join(Config.TNS_APP_SRC, 'fonts', '**', '*.ttf'),
  ];

  return copyFiles(paths, 'fonts');
}

export =
  class BuildTNSAssetsTask extends AssetsTask {
    run() {
      return merge(
        copyAssets(),
        copyAppResources(),
        copyAppFonts(),
        copyFiles([join(Config.TNS_APP_SRC, 'package.json')], ''),
      );
    }
  };

