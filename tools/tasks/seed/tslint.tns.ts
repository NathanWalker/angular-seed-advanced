// https://github.com/mgechev/angular-seed/pull/1681
// Unfortunately gulp-tslint doesn't support tslint 4 yet so the change uses a npm script instead.

/** HACK: codelyzer doesn't like typescript 2.2.0-dev* */
const ts = require('typescript');
console.warn('UGLY HACK: codelyzer doesn\'t like typescript 2.2.0-dev* so faking the version');
ts.version = '2.1.3';
/** END - HACK: codelyzer doesn't like typescript 2.2.0-dev* */

import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';

import Config from '../../config';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, linting the TypeScript files using `codelyzer`.
 */
export = (done: any) => {
  done();
  // let src = [
  //   '**/*.ts',
  //   'app/**/*.ts',
  // ];

  // return gulp.src(src, {
  //   base: Config.TNS_APP_SRC,
  //   cwd: Config.TNS_APP_SRC,
  // })
  //   .pipe(plugins.tslint())
  //   .pipe(plugins.tslint().report({
  //     emitError: require('is-ci')
  //   }));
};
