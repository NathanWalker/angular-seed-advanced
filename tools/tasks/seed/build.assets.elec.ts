import * as gulp from 'gulp';
import * as merge from 'merge-stream';
import { join } from 'path';
import * as newer from 'gulp-newer';

import { AssetsTask } from '../assets_task';
import Config from '../../config';

function copyFiles(paths: string[], subdir: string) {
  const dest = join(Config.ELECTRON_APP_SRC, subdir);

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

function copyAppFonts() {
  const paths: string[] = [
    join(Config.ELECTRON_APP_SRC, 'fonts', '**', '*.otf'),
    join(Config.ELECTRON_APP_SRC, 'fonts', '**', '*.ttf'),
  ];

  return copyFiles(paths, 'fonts');
}

export =
  class BuildElectronAssetsTask extends AssetsTask {
    run() {
      return merge(
        copyAssets(),
        copyAppFonts(),
        copyFiles([join(Config.ELECTRON_APP_SRC, 'package.json')], ''),
      );
    }
  };

