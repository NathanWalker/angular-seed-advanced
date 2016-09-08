import 'reflect-metadata';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join} from 'path';

import { APP_DEST, APP_SRC, TOOLS_DIR } from '../../config';//ENABLE_SCSS
import { makeTsProject } from '../../utils';
// import { ViewBroker } from '../../../src/client/app/frameworks/core/utils/view-broker';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, transpiling the TypeScript files (excluding the spec and e2e-spec files) for the test
 * environment.
 */
export = () => {
  let tsProject = makeTsProject();
  let src = [
    'typings/index.d.ts',
    TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(APP_SRC, '**/*.spec.ts')
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    // .pipe(plugins.inlineNg2Template({
    //   base: APP_SRC,
    //   useRelativePaths: true,
    //   templateFunction: ViewBroker.TEMPLATE_URL,
    //   supportNonExistentFiles: ENABLE_SCSS
    // }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.typescript(tsProject));

  return result.js
    .pipe(gulp.dest(APP_DEST));
};

