import 'reflect-metadata';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import Config from '../../config';
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
    Config.TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(Config.APP_SRC, '**/*.spec.ts')
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
    .pipe(tsProject());

  return result.js
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(Config.APP_DEST));
};
