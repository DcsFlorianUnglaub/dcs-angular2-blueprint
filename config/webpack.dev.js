const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const autoprefixer = require('autoprefixer');
const pixrem = require('pixrem');

const helpers = require('./helpers');
const buildPath = helpers.root('build', 'development');
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = webpackMerge(commonConfig, {
  debug: true,
  // devtool: 'cheap-module-source-map',
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: buildPath,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js',
    library: 'ac_[name]',
    libraryTarget: 'var',
  },

  plugins: [
    new DefinePlugin({
      'ENV': JSON.stringify(ENV)
    })
  ],

  postcss: function () {
    return [
      autoprefixer({ browsers: 'last 2 versions, ie > 10, safari >= 9' }),
      pixrem
    ];
  },

  devServer: {
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: buildPath
  },

});
