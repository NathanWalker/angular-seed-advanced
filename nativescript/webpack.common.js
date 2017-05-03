var webpack = require("webpack");
var nsWebpack = require("nativescript-dev-webpack");
var nativescriptTarget = require("nativescript-dev-webpack/nativescript-target");
var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AotPlugin = require("@ngtools/webpack").AotPlugin;

module.exports = function (platform, destinationApp) {
    if (!destinationApp) {
        //Default destination inside platforms/<platform>/...
        destinationApp = nsWebpack.getAppPath(platform);
    }
    var entry = {};
    // Discover entry module from package.json
    entry.bundle = "./" + nsWebpack.getEntryModule();
    //Vendor entry with third party libraries.
    entry.vendor = "./vendor";
    // app.css bundle
    entry["app.css"] = "./app." + platform + ".css";

    // Vendor libs go to the vendor.js chunk
    var commonsChunkNames = ["vendor"];

    // Compatibility workaround with NativeScript 2.5 Android runtime
    // https://github.com/NativeScript/NativeScript/issues/3947
     if (platform === "android") {
        commonsChunkNames.push("tns-java-classes");
    }

    var plugins = [
        new ExtractTextPlugin("app.css"),
        // Vendor libs go to the vendor.js chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: commonsChunkNames
        }),
        // Define useful constants like TNS_WEBPACK
        new webpack.DefinePlugin({
            "global.TNS_WEBPACK": "true",
        }),
        // Copy assets to out dir. Add your own globs as needed.
        new CopyWebpackPlugin([
            { from: "app." + platform + ".css", to: 'app.css' },
            { from: "css/**" },
            { from: "fonts/**" },
            { from: "**/*.jpg" },
            { from: "**/*.png" },
            { from: "**/*.xml" },
            { from: 'assets', to: 'assets', type: 'dir' }
        ], { ignore: ["App_Resources/**"] }),
        // Generate a bundle starter script and activate it in package.json
        new nsWebpack.GenerateBundleStarterPlugin([
            "./vendor",
            "./bundle",
        ]),

        // Angular AOT compiler
        new AotPlugin({
            tsConfigPath: "tsconfig.aot.json",
            entryModule: path.resolve(__dirname, "app/native.module#NativeModule"),
            typeChecking: false
        }),
        new nsWebpack.StyleUrlResolvePlugin({platform}),
    ];

    if (process.env.npm_config_uglify) {
        plugins.push(new webpack.LoaderOptionsPlugin({
            minimize: true
        }));

        // Work around an Android issue by setting compress = false
        var compress = platform !== "android";
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: nsWebpack.uglifyMangleExcludes,
            },
            compress: compress,
        }));
    }

    return {
        context: path.resolve("./app"),
        target: nativescriptTarget,
        entry: entry,
        output: {
            pathinfo: true,
            path: path.resolve(destinationApp),
            libraryTarget: "commonjs2",
            filename: "[name].js",
        },
        resolve: {
            // Resolve platform-specific modules like module.android.js
            extensions: [
                "." + platform + ".ts",
                "." + platform + ".js",
                "." + platform + ".css",
                ".aot.ts",
                ".ts",
                ".js",
                ".css",
            ],
            // Resolve {N} system modules from tns-core-modules
            modules: [
                "node_modules/tns-core-modules",
                "node_modules",
            ]
        },
        node: {
            // Disable node shims that conflict with NativeScript
            "http": false,
            "timers": false,
            "setImmediate": false,
            "fs": "empty",
        },
        module: {
            loaders: [
                {
                    test: /\.html$|\.xml$/,
                    loaders: [
                        "raw-loader",
                    ]
                },
                // Root app.css file gets extracted with bundled dependencies
                {
                    test: /app\.css$/,
                    loader: ExtractTextPlugin.extract([
                        "resolve-url-loader",
                        "nativescript-css-loader",
                        "nativescript-dev-webpack/platform-css-loader",
                    ]),
                },
                // Other CSS files get bundled using the raw loader
                {
                    test: /\.css$/,
                    exclude: /app\.css$/,
                    loaders: [
                        "raw-loader",
                    ]
                },
                // Compile TypeScript files with ahead-of-time compiler.
                {
                    test: /\.ts$/,
                    loaders: [
                        "nativescript-dev-webpack/tns-aot-loader",
                        "@ngtools/webpack",
                    ]
                },
                // SASS support
                {
                    test: /\.scss$/,
                    loaders: [
                        "raw-loader",
                        "resolve-url-loader",
                        "sass-loader",
                    ]
                },
            ]
        },
        plugins: plugins,
    };
};
