/** HACK: codelyzer doesn't like typescript 2.2.0-dev* */
const ts = require('typescript');
console.warn('UGLY HACK: codelyzer doesn\'t like typescript 2.2.0-dev* so faking the version');
ts.version = '2.1.3';
/** END - HACK: codelyzer doesn't like typescript 2.2.0-dev* */

import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import Config from '../../config';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, linting the TypeScript files using `codelyzer`.
 */
export = () => {
  let src = [
    join(Config.APP_SRC, '**/*.ts'),
    '!' + join(Config.APP_SRC, '**/*.d.ts'),
      join(Config.E2E_SRC, '**/*.ts'),
    '!' + join(Config.E2E_SRC, '**/*.d.ts'),
    join(Config.TOOLS_DIR, '**/*.ts'),
    '!' + join(Config.TOOLS_DIR, '**/*.d.ts')
  ];

  return gulp.src(src)
    .pipe(plugins.tslint())
    .pipe(plugins.tslint.report({
      emitError: require('is-ci')
    }));
};
