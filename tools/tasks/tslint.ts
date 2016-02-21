import {join} from 'path';
import {APP_SRC, TOOLS_DIR, NG2LINT_RULES} from '../config';
import {customIgnore} from '../utils';

export = function tslint(gulp, plugins) {
  return function () {
    let src = [
      join(APP_SRC, '**/*.ts'),
      '!' + join(APP_SRC, '**/*.d.ts'),
      join(TOOLS_DIR, '**/*.ts'),
      '!' + join(TOOLS_DIR, '**/*.d.ts'),
      ...customIgnore
    ];

    return gulp.src(src)
      .pipe(plugins.tslint({
        rulesDirectory: NG2LINT_RULES
      }))
      .pipe(plugins.tslint.report(plugins.tslintStylish, {
        emitError: false,
        sort: true,
        bell: true
      }));
  };
};
