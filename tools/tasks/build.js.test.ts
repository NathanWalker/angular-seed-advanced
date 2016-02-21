import {join} from 'path';
import {BOOTSTRAP_MODULE, APP_SRC, APP_DEST} from '../config';
import {tsProjectFn, customIgnore} from '../utils';

export = function buildJSTest(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
      'typings/browser.d.ts',
      join(APP_SRC, '**/*.ts'),
      '!' + join(APP_SRC, 'app/**/*.ts'),
      '!' + join(APP_SRC, '**/*.e2e.ts'),
      '!' + join(APP_SRC, `${BOOTSTRAP_MODULE}.ts`),
      ...customIgnore
    ];
    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template({ base: APP_SRC, useRelativePaths: false }))
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(gulp.dest(APP_DEST));
  };
};
