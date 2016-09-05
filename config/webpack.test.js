const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const helpers = require('./helpers');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';


module.exports = {

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src')
  },

  module: {

    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          // helpers.root('node_modules/rxjs'),
          // helpers.root('node_modules/@angular')
          helpers.root('node_modules/@angular/compiler')
        ]
      }
    ],

    loaders: [

      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          sourceMap: false,
          inlineSourceMap: true
        },
        exclude: [
          /\.e2e\.ts$/
        ]
      },

      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: [helpers.root('src/index.html')]
      },

      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader'],
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
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      }

    ],

    postLoaders: [

      {
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        include: helpers.root('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }

    ]
  },

  plugins: [
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV),
      }
    })

  ]

};
