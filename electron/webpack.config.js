// @joaogarin

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
const webpack = require('webpack');
const helpers = require('./helpers');
const path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/*
 * Config
 */
var config = {
    // for faster builds use 'eval'
    devtool: 'source-map',
    // cache: false,

    // our angular app
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/app/app',
    },

    // Config for our build files
    output: {
        path: helpers.root('src/app/dist'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
    /*
    * Options affecting the resolving of modules.
    *
    * See: http://webpack.github.io/docs/configuration.html#resolve
    */
    resolve: {
        /*
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['.ts', '.js', '.json', '.css', '.html'],

        // An array of directory names to be resolved to the current directory
        modules: [helpers.root('src'), 'node_modules'],

    },
    /*
    * Options affecting the resolving of modules.
    *
    * See: http://webpack.github.io/docs/configuration.html#resolve
    */
    module: {
        rules: [
            // Support for .ts files.
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                exclude: [/\.(spec|e2e)\.ts$/]
            },

            // Support for *.json files.
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
            },

            // support for .html antd .css as raw text
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [helpers.root('app/index.html')]
            },

            // support for fonts
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader?name=dist/[name]-[hash].[ext]'
            },

            // support for svg icons
            {
                test: /\.svg/,
                loader: 'svg-url-loader'
            }
        ]
    },
    plugins: [

        // Plugin: CommonsChunkPlugin
        // Description: Shares common code between the pages.
        // It identifies common modules and put them into a commons chunk.
        //
        // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
        new webpack.optimize.CommonsChunkPlugin({ name: ['vendor', 'polyfills'], minChunks: Infinity }),
        // Plugin: CopyWebpackPlugin
        // Description: Copy files and directories in webpack.
        //
        // Copies project static assets.
        //
        // See: https://www.npmjs.com/package/copy-webpack-plugin
        new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
        /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
        new LoaderOptionsPlugin({
            debug: true,
            options: {
                /**
                 * Static analysis linter for TypeScript advanced options configuration
                 * Description: An extensible linter for the TypeScript language.
                 *
                 * See: https://github.com/wbuchwalter/tslint-loader
                 */
                tslint: {
                    emitErrors: false,
                    failOnHint: false,
                    resourcePath: 'src'
                },
            }
        }),
    ],
    // we need this due to problems with es6-shim
    node: {
        global: true,
        progress: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};

/**
 * Target Electron
 */
config.target = 'electron-renderer';
module.exports = config;
