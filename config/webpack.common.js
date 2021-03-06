const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

const helpers = require('./helpers');


module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.json'],
    root: helpers.root('src'),
    modulesDirectories: ['node_modules'],
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular'),
          helpers.root('node_modules/ng2-redux'),
        ]
      }
    ],

    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript',
          'angular2-template',
          '@angularclass/hmr-loader'
        ],
        exclude: [
          /\.(spec|e2e)\.ts$/
        ]
      },

      {
        test: /\.json$/,
        loader: 'json'
      },

      {
        test: /\.css$/,
        loaders: ['to-string', 'css']
      },

      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },

      {
        test: /\.scss$/,
        loaders: [
          'css',
          'postcss',
          'sass'
        ]
      },

      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ['file']
      }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor', 'main'].reverse()
    }),

    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),

    // make weird WARNING after upgrading from RC7 to final release go away
    // https://github.com/AngularClass/angular2-webpack-starter/issues/993
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    ),
  ]

};
