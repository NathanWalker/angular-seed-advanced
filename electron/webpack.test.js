const helpers = require('./tools/webpack/helpers');

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

    /**
     * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
     *
     * Do not change, leave as is or it wont work.
     * See: https://github.com/webpack/karma-webpack#source-maps
     */
    devtool: 'inline-source-map',

    /**
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

        /**
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['', '.ts', '.js'],

        /**
         * Make sure root is src
         */
        root: helpers.root('src'),

    },

    /**
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

        /**
         * An array of applied pre and post loaders.
         *
         * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
         */
        preLoaders: [

            /**
             * Tslint loader support for *.ts files
             *
             * See: https://github.com/wbuchwalter/tslint-loader
             */
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [helpers.root('node_modules')]
            },

            /**
             * Source map loader support for *.js files
             * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
             *
             * See: https://github.com/webpack/source-map-loader
             */
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    helpers.root('node_modules/rxjs'),
                    helpers.root('node_modules/@angular')
                ]
            }

        ],

        /**
         * An array of automatically applied loaders.
         *
         * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
         * This means they are not resolved relative to the configuration file.
         *
         * See: http://webpack.github.io/docs/configuration.html#module-loaders
         */
        loaders: [

            /**
             * Typescript loader support for .ts and Angular 2 async routes via .async.ts
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader
             */
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                query: {
                    compilerOptions: {

                        // Remove TypeScript helpers to be injected
                        // below by DefinePlugin
                        removeComments: true

                    }
                },
                exclude: [/\.e2e\.ts$/]
            },

            // Support for *.json files.
            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            // Support for CSS as raw text
            {
                test: /\.css$/,
                loader: 'raw-loader'
            },

            // support for .html as raw text
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [helpers.root('app/index.html')]
            },

            // Support for CSS as raw text
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['css'])
            },

            // General sass should be included in a css file
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css', 'sass']),
                exclude: [
                    helpers.root('src/app/components'),
                    helpers.root('src/app/projects'),
                    helpers.root('src/app/home'),
                    helpers.root('src/app/shared'),
                    helpers.root('src/app/login'),
                ]
            },

            // Component specific sass should be included in the component
            {
                test: /\.scss$/,
                loaders: ["css", "sass"],
                exclude: [helpers.root('src/app/sass')]
            },

            // Inline base64 URLs for <=8k images, direct URLs for the rest
            {
                test: /\.(png|jpg|jpeg)$/,
                loader: 'url-loader?limit=10000'
            },

            // Font handeling - used in fontawesome and other fonts
            , {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }

        ],

        /**
         * An array of applied pre and post loaders.
         *
         * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
         */
        postLoaders: [

            /**
             * Instruments JS files with Istanbul for subsequent code coverage reporting.
             * Instrument only testing sources.
             *
             * See: https://github.com/deepsweet/istanbul-instrumenter-loader
             */
            {
                test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
                include: helpers.root('src'),
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /node_modules/
                ]
            }

        ]
    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

        /**
         * Plugin: DefinePlugin
         * Description: Define free variables.
         * Useful for having development builds with debug logging or adding global constants.
         *
         * Environment helpers
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
         */
        // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
        new DefinePlugin({
            'ENV': JSON.stringify(ENV),
            'HMR': false,
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'NODE_ENV': JSON.stringify(ENV),
                'HMR': false,
            }
        }),


    ],

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

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
        global: 'window',
        process: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }

};