var gulp = require('gulp');
var path = require('path');
var webpackStream = require('webpack-stream');

gulp.task('default', ['build']);

gulp.task('watch', ['build'], function() {
  gulp.watch('./src/**/*.ts', ['build']);
});

gulp.task('build', function() {
  return gulp.src('./src/app.ts')
    .pipe(webpackStream({
      entry: ["./src/app.ts"],
      output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
      },
      resolve: {
        extensions: ["", ".ts", ".d.ts", ".js"]
      },
      plugins: [
        new webpackStream.webpack.ProvidePlugin({
          $: "jquery",
          jquery: "jquery",
          "window.jQuery": "jquery",
          jQuery: "jquery"
        })
      ],
      module: {
        loaders: [
          { test: /\.ts?$/, loader: "ts-loader", exclude: /node_modules/ },
          { test: /\.css$/, loader: 'style-loader!css-loader' },
          { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
          { test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" },
          { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
          { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
        ]
      }
    }))
    .pipe(gulp.dest('./build'));
});
