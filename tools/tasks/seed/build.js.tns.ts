import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';

import Config from '../../config';
import { makeTsProject, TemplateLocalsBuilder } from '../../utils';
import { TypeScriptTask } from '../typescript_task';

const plugins = <any>gulpLoadPlugins();

const jsonSystemConfig = JSON.stringify(Config.TNS_CONFIG);

/**
 * Executes the build process, transpiling the TypeScript files (except the spec and e2e-spec files) for the development
 * environment.
 */
export =
  class BuildJsDev extends TypeScriptTask {
    run() {
      const src = [
        '**/*.ts',
        'app/**/*.ts',
        '!**/*.spec.ts',
        '!app/**/*.spec.ts',
        '!**/*.e2e-spec.ts',
        '!app/**/*.e2e-spec.ts',
        `!**/${Config.NG_FACTORY_FILE}.ts`,
      ];

      const tsProject = makeTsProject({}, Config.TNS_APP_SRC);

      const projectFiles = gulp.src(src, {
        base: Config.TNS_APP_SRC,
        cwd: Config.TNS_APP_SRC,
      });

      const result = projectFiles
        .pipe(plugins.sourcemaps.init())
        .pipe(tsProject());

      const template = (<any>Object).assign(
        new TemplateLocalsBuilder().withStringifiedSystemConfigDev().build(), {
          SYSTEM_CONFIG_TNS: jsonSystemConfig
        },
      );

      return result.js
        .pipe(plugins.sourcemaps.write())
        // Use for debugging with Webstorm/IntelliJ
        // https://github.com/mgechev/angular-seed/issues/1220
        //    .pipe(plugins.sourcemaps.write('.', {
        //      includeContent: false,
        //      sourceRoot: (file: any) =>
        //        relative(file.path, PROJECT_ROOT + '/' + APP_SRC).replace(sep, '/') + '/' + APP_SRC
        //    }))
        .pipe(plugins.template(template))
        .pipe(gulp.dest(Config.TNS_APP_DEST));
    }
  };


