import {join} from 'path';
import {APP_SRC, TMP_DIR} from '../config';
import {templateLocals, tsProjectFn, customIgnore} from '../utils';

const INLINE_OPTIONS = {
  base: TMP_DIR ,
  useRelativePaths: false,
  removeLineBreaks: true
};

export = function buildJSProd(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    let src = [
      'typings/browser.d.ts',
      'tools/manual_typings/**/*.d.ts',
      join(APP_SRC, '**/*.ts'),
      '!' + join(APP_SRC, '**/*.spec.ts'),
      '!' + join(APP_SRC, '**/*.e2e.ts'),
      ...customIgnore
    ];
    let result = gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.inlineNg2Template(INLINE_OPTIONS))
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(TMP_DIR));
  };
};
