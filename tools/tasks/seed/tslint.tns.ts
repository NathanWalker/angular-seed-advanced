// https://github.com/mgechev/angular-seed/pull/1681
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';

import Config from '../../config';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, linting the TypeScript files using `codelyzer`.
 */
export = () => {
  let src = [
    '**/*.ts',
    'app/**/*.ts',
  ];

  return gulp.src(src, {
    base: Config.TNS_APP_SRC,
    cwd: Config.TNS_APP_SRC,
  })
    .pipe(plugins.tslint())
    .pipe(plugins.tslint.report({
      emitError: require('is-ci')
    }));
};
