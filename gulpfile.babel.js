import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const $ = gulpLoadPlugins();
let options = {};

gulp.task('serve', () => {
  const config = require('./webpack.config');
  const bundler = webpack(config);
  let server = new WebpackDevServer(bundler, {
    contentBase: './src/public',
    publicPath: './src/public/',
    hot: true,
    inline: true,
    stats: {
      colors: true
    }
  });
  
  server.listen(7777, 'localhost', (err) => {
    console.log('server listen at 7777');
  });
});
