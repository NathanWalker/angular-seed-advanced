import * as gulp from 'gulp';
var symdest = require('gulp-symdest');
var electron = require('gulp-atom-electron');

export = () => {
  let src = [
    'dist/dev/**/*'
  ];
  return gulp.src(src, { base: 'dist/dev' })
    .pipe(electron({ version: '0.37.2', platform: 'darwin', darwinIcon: 'src/client/assets/logo.icns' }))
    .pipe(symdest('desktop/mac'));
};
