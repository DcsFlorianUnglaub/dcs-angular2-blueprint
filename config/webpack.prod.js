const webpackMerge = require('webpack-merge');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CompressionPlugin = require('compression-webpack-plugin')

const autoprefixer = require('autoprefixer');
const pixrem = require('pixrem');
const cssnano = require('cssnano');

const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const buildPath = helpers.root('build', 'production');
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';


module.exports = webpackMerge(commonConfig, {
  debug: false,
  devtool: 'source-map',

  output: {
    path: buildPath,
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].map',
    chunkFilename: '[id].[chunkhash].chunk.js',
    library: 'ac_[name]',
    libraryTarget: 'var',
  },

  plugins: [
    new WebpackMd5Hash(),
    new DedupePlugin(),

    new UglifyJsPlugin({
      beautify: false,
      // seems broken with current Angular RC.5
      // TODO: recheck later
      // mangle: {
      //   screw_ie8 : true
      // },
      mangle: {
        screw_ie8 : true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        drop_debugger: true,
        dead_code: true,
        unused: true
      },
      comments: false
    }),

    new CompressionPlugin({
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    }),

    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'process.env.NODE_ENV': JSON.stringify(ENV)
    })
  ],

  postcss: function () {
    return [
      autoprefixer({ browsers: 'last 2 versions, ie > 10, safari >= 9' }),
      pixrem,
      cssnano
    ];
  }

});
