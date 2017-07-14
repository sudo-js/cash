module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    files: [
      { pattern: 'specs.webpack.js', watched: false }
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'specs.webpack.js': ['webpack']
    },
    reporters: ['mocha'],
    singleRun: true,
    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};
