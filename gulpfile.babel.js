const gulp = require('gulp')
    , runSequence = require('run-sequence')
    , del = require('del')
    , nodemon = require('nodemon')
    , plugins = require('gulp-load-plugins')();

const paths = {
  files: [
    'app/**/*.js',
    'config/**/*.js'
  ],
  tests: [
    'tests/**/*.js'
  ],
  dist: 'dist'
};

const onServerLog = (log) => {
  console.log(plugins.util.colors.white('[') +
    plugins.util.colors.yellow('nodemon') +
    plugins.util.colors.white('] ') +
    log.message);
};

gulp.task('serve', cb => {
  runSequence(
    'start:server',
    cb
  );
});

gulp.task('start:server', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  nodemon(`-w index.js index.js`)
    .on('log', onServerLog);
});

// Build task
gulp.task('build', cb => {
  runSequence( 
    'clean:dist',
    'transpile:server',
    'copy:server',
    cb
  );
});

gulp.task('clean:dist', () => del([`${paths.dist}/!(.git*)**`], {dot: true}));
gulp.task('transpile:server', () => {
  gulp.src( paths.files )
    .pipe(plugins.sourcemaps.init)
    .pipe(plugins.babel, {
      plugins: [
        'transform-class-properties',
        'transform-runtime'
      ]
    })
    .pipe(plugins.sourcemaps.write, '.')
    .pipe(gulp.dest(paths.dist) );
});
gulp.task('copy:server', () => 
  gulp.src([
    'package.json',
    'Dockerfile',
    '.env.example'
  ], {cwdbase: true})
    .pipe(gulp.dest(paths.dist))
);