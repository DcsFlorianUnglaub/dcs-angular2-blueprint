const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const helpers = require('./helpers');
const buildPath = helpers.root('build', 'development');
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';


module.exports = webpackMerge(commonConfig, {
  debug: true,
  devtool: 'cheap-module-source-map',

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
