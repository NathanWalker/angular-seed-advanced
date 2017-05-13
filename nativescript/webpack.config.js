const { resolve, join  } = require("path");

const webpack = require("webpack");
const nsWebpack = require("nativescript-dev-webpack");
const nativescriptTarget = require("nativescript-dev-webpack/nativescript-target");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const { AotPlugin } = require("@ngtools/webpack");

const mainSheet = `app.css`;

module.exports = env => {
    const platform = getPlatform(env);

    // Default destination inside platforms/<platform>/...
    const path = resolve(nsWebpack.getAppPath(platform));

    const entry = {
        // Discover entry module from package.json
        bundle: `./${nsWebpack.getEntryModule()}`,

        // Vendor entry with third-party libraries
        vendor: `./vendor`,

        // Entry for stylesheet with global application styles
        [mainSheet]: `./${mainSheet}`,
    };

    const rules = getRules();
    const plugins = getPlugins(platform, env);
    const extensions = getExtensions(platform);

    return {
        context: resolve("./app"),
        target: nativescriptTarget,
        entry,
        output: {
            pathinfo: true,
            path,
            libraryTarget: "commonjs2",
            filename: "[name].js",
        },
        resolve: {
            extensions,

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
        module: { rules },
        plugins,
    };
};


function getPlatform(env) {
    return env.android ? "android" :
        env.ios ? "ios" :
        () => { throw new Error("You need to provide a target platform!") };
}

function getRules() {
    return [
        {
            test: /\.html$|\.xml$/,
            use: [
                "raw-loader",
            ]
        },
        // Root stylesheet gets extracted with bundled dependencies
        {
            test: new RegExp(mainSheet),
            use: ExtractTextPlugin.extract([
                {
                    loader: "resolve-url-loader",
                    options: { silent: true },
                },
                "nativescript-css-loader",
                "nativescript-dev-webpack/platform-css-loader",
            ]),
        },
        // Other CSS files get bundled using the raw loader
        {
            test: /\.css$/,
            exclude: new RegExp(mainSheet),
            use: [
                "raw-loader",
            ]
        },
        // SASS support
        {
            test: /\.scss$/,
            use: [
                "raw-loader",
                "resolve-url-loader",
                "sass-loader",
            ]
        },


        // Compile TypeScript files with ahead-of-time compiler.
        {
            test: /\.ts$/,
            loaders: [
                "nativescript-dev-webpack/tns-aot-loader",
                "@ngtools/webpack",
            ]
        }

    ];
}

function getPlugins(platform, env) {
    let plugins = [
        new ExtractTextPlugin(mainSheet),

        // Vendor libs go to the vendor.js chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor"],
        }),

        // Define useful constants like TNS_WEBPACK
        new webpack.DefinePlugin({
            "global.TNS_WEBPACK": "true",
        }),

        // Copy assets to out dir. Add your own globs as needed.
        new CopyWebpackPlugin([
            { from: mainSheet },
            { from: "css/**" },
            { from: "fonts/**" },
            { from: "**/*.jpg" },
            { from: "**/*.png" },
            { from: "**/*.xml" },
        ], { ignore: ["App_Resources/**"] }),

        // Generate a bundle starter script and activate it in package.json
        new nsWebpack.GenerateBundleStarterPlugin([
            "./vendor",
            "./bundle",
        ]),

        // Angular AOT compiler
        new AotPlugin({
            tsConfigPath: "tsconfig.aot.json",
            entryModule: resolve(__dirname, "app/app.module#AppModule"),
            typeChecking: false
        }),

        // Resolve .ios.css and .android.css component stylesheets
        new nsWebpack.StyleUrlResolvePlugin({platform}),

    ];
    
    if (env.uglify) {
        plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));

        // Work around an Android issue by setting compress = false
        const compress = platform !== "android";
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            mangle: { except: nsWebpack.uglifyMangleExcludes },
            compress,
        }));
    }

    return plugins;
}

// Resolve platform-specific modules like module.android.js
function getExtensions(platform) {
    return Object.freeze([
        `.${platform}.ts`,
        `.${platform}.js`,
        ".aot.ts",
        ".ts",
        ".js",
        ".css",
        `.${platform}.css`,
    ]);
}
