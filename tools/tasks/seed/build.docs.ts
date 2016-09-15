import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import Config from '../../config';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, building the documentation for the TypeScript
 * files (excluding spec and e2e-spec files) using `typedoc`.
 */
export = () => {

  let src = [
    'typings/index.d.ts',
    join(Config.APP_SRC, '**/*.ts'),
    '!' + join(Config.APP_SRC, '**/*.spec.ts'),
    '!' + join(Config.APP_SRC, '**/*.e2e-spec.ts')
  ];

  return gulp.src(src)
    .pipe(plugins.typedoc({
      // TypeScript options (see typescript docs)
      module: 'commonjs',
      target: 'es5',
      excludeExternals: true,
      includeDeclarations: true,
      // Output options (see typedoc docs)
      out: Config.DOCS_DEST,
      json: join(Config.DOCS_DEST, 'data/docs.json'),
      name: Config.APP_TITLE,
      ignoreCompilerErrors: false,
      experimentalDecorators: true,
      version: true
    }));
};
