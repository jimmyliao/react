import gulp from 'gulp';
import gutil from 'gulp-util';
import watch from 'gulp-watch';
import babel from 'gulp-babel';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.config.js';

/// Stage 1
// gulp.task('default', () => {
//   return gulp.src('src/**/*.js')
//     .pipe(babel())
//     .pipe(gulp.dest('lib'));
// });
// 
/// Stage 2
// gulp.task('transform', () => {
//   return gulp.src('src/**/*.js')
//     .pipe(babel())
//     .pipe(gulp.dest('lib'));
// });

// gulp.task('watch', () => {
//   return gulp.src('src/**/*.js')
//     .pipe(watch('src/**/*.js', {
//       verbose: true
//     }))
//     .pipe(babel())
//     .pipe(gulp.dest('lib'));
// });

// gulp.task('default', () => {
//   gulp.start('transform');
// });

// transform
gulp.task('transform', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

// watch transform
gulp.task('watch-transform', () => {
  return gulp.src('src/**/*.js')
    .pipe(watch('src/**/*.js', {
      verbose: true
    }))
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('webpack:build', (callback) => {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, (err, stats) => {
    if (err)
      throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', (callback) => {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = 'eval';
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: '/' + myConfig.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(3001, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:3001/');
  });
});

gulp.task('default', ['watch-transform', 'webpack-dev-server']);

