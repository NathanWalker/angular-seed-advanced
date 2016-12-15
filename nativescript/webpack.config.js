var bundler = require("nativescript-dev-webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = bundler.getConfig({
  resolveloader: {
    root: path.join(__dirname, "node_modules")
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: {
          glob: 'assets/**/*',
          dot: true
        }
      },
      {
        from: {
          glob: 'css/**/*',
          dot: true
        }
      },
      {
        from: {
          glob: 'fonts/**/*',
          dot: true
        }
      },
      {
        from: 'app.css',
      },
      {
        from: 'app.css.' + process.env.PLATFORM,
        to: 'app.css',
      },
      {
        from: {
          glob: '**/*.component.css',
          dot: true
        }
      },
      {
        from: {
          glob: '**/*.component.html',
          dot: true
        }
      },
      {
        from: {
          glob: '**/*.component.*.' + process.env.PLATFORM,
          dot: true
        },
        to: '[path]/[name]'
      },
      // @nota plugins
      {
        from: path.resolve(__dirname,  'node_modules/@nota/nativescript-ng2-content-viewer/www/'),
        to: 'tns_modules/@nota/nativescript-ng2-content-viewer/www/',
        toType: 'dir',
      },
      // END - @nota plugins
    ]),
  ],
});
