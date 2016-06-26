import * as gulp from 'gulp';
var symdest = require('gulp-symdest');
var electron = require('gulp-atom-electron');

export = () => {
  let src = [
    'dist/dev/**/*'
  ];
  return gulp.src(src, { base: 'dist/dev' })
    .pipe(electron({ version: '0.37.2', platform: 'win32', winIcon: 'src/client/assets/logo.ico' }))
    .pipe(symdest('desktop/windows'));
};
