var webpack = require('webpack');
var nsWebpack = require('nativescript-dev-webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var AotPlugin = require('@ngtools/webpack').AotPlugin;

var nativescriptTarget = require('nativescript-dev-webpack/nativescript-target');

module.exports = function(platform, destinationApp) {
  if (!destinationApp) {
    //Default destination inside platforms/<platform>/...
    destinationApp = nsWebpack.getAppPath(platform);
  }
  var entry = {};
  //Discover entry module from package.json
  entry.bundle = './' + nsWebpack.getEntryModule();
  //Vendor entry with third party libraries.
  // TODO: create a vendor bundle
  entry.vendor = './vendor';
  //app.css bundle
  entry['app.css'] = './app.' + platform + '.css';

  return {
    context: path.resolve('./app'),
    target: nativescriptTarget,
    entry: entry,
    output: {
      pathinfo: true,
      path: path.resolve(destinationApp),
      libraryTarget: 'commonjs2',
      filename: '[name].js',
    },
    resolve: {
      //Resolve platform-specific modules like module.android.js
      extensions: [
        '.aot.ts',
        '.ts',
        '.js',
        '.css',
        '.' + platform + '.ts',
        '.' + platform + '.js',
        '.' + platform + '.css',
      ],
      //Resolve {N} system modules from tns-core-modules
      modules: [
        'node_modules/tns-core-modules',
        'node_modules'
      ]
    },
    node: {
      //Disable node shims that conflict with NativeScript
      'http': false,
      'timers': false,
      'setImmediate': false,
    },
    module: {
      rules: [

        {
          test: /\.html$/,
          use: [
            'tns-loader',
            'raw-loader',
          ]
        },

        // Root app.css file gets extracted with bundled dependencies
        {
          test: /app\.css$/,
          use: [
            'resolve-url-loader',
            'css-loader',
            'nativescript-dev-webpack/platform-css-loader',
          ],
        },
        // Other CSS files get bundled using the raw loader
        {
          test: /\.css$/,
          exclude: /app\.css$/,
          use: [
            'raw-loader',
          ]
        },

        // Compile TypeScript files with ahead-of-time compiler.
        {
          test: /\.ts$/,
          use: [
            '@ngtools/webpack',
            'nativescript-dev-webpack/tns-aot-loader',
            'tns-loader',
          ]
        },

        /*
         * Json loader support for *.json files.
         *
         * See: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          use: 'json-loader'
        },

        // SASS support
        {
          test: /\.scss$/,
          use: [
            'raw-loader',
            'resolve-url-loader',
            'sass-loader',
            'tns-loader',
          ]
        },

        /* File loader for supporting images, for example, in CSS files.
         */
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        }
      ]
    },
    resolveLoader: {
      alias: {
        'tns-loader': path.join(__dirname, 'tools', 'tns-loader.js'),
      }
    },
    plugins: [
      new ExtractTextPlugin('app.css'),
      //Vendor libs go to the vendor.js chunk
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor']
      }),
      //Define useful constants like TNS_WEBPACK
      new webpack.DefinePlugin({
        global: 'global',
        __dirname: '__dirname',
        'global.TNS_WEBPACK': 'true',
      }),
      //Copy assets to out dir. Add your own globs as needed.
      new CopyWebpackPlugin([{
        from: 'app.' + platform + '.css',
        to: 'app.css'
      }, {
        from: 'css/**'
      }, {
        from: '**/*.jpg'
      }, {
        from: '**/*.png'
      }, {
        from: '**/*.xml'
      }, ], {
        ignore: ['App_Resources/**']
      }),
      //Generate a bundle starter script and activate it in package.json
      new nsWebpack.GenerateBundleStarterPlugin([
        './vendor',
        './bundle',
      ]),
      //Angular AOT compiler
      new AotPlugin({
        tsConfigPath: 'tsconfig.aot.json',
        entryModule: 'app/native.module#NativeModule',
        typeChecking: false
      })
    ],
  };
};
