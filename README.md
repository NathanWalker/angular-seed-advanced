# Introduction

## Please note: This is a WIP!

An advanced seed project for Angular 2 apps.

`angular2-seed-advanced` will provide the following features:

- Ready to go, statically typed build system using gulp for working with TypeScript.
- Production and development builds.
- Sample unit tests with Jasmine and Karma.
- End-to-end tests with Protractor.
- Development server with Livereload.
- Experimental hot loading support.
- Following the best practices for your application’s structure.
- Manager of your type definitions using [typings](https://github.com/typings/typings).

Out of the box support for:
- [lodash](https://lodash.com/)
- [ng2-translate](https://github.com/ocombe/ng2-translate) for i18n

Coming Soon...
- [ ] [ngrx/store](https://github.com/ngrx/store) for state management (Redux inspired)
- [ ] [NativeScript](https://www.nativescript.org/) bootstrap ability for cross platform mobile apps.
- [ ] [Electron](http://electron.atom.io/) bootstrap ability for cross platform desktop apps.
- [ ] [angular cli](https://github.com/angular/angular-cli) to help in component, service, pipe creation, etc. (it does `not` use it for the build)
- [ ] provider for LocalStorage (abstraction for IndexedDB, WebSQL, localStorage, perhaps a port of localForage)
- [ ] sophisticated setup for Service Worker
- [ ] integration with [ng2-bootstrap](https://github.com/valor-software/ng2-bootstrap)

# How to start

**Note** that this seed project requires node v4.x.x or higher and npm 2.14.7.

You must have `ts-node` installed as global. If you don't, use:

```bash
npm install -g ts-node
```

In order to start the seed use:


```bash
git clone --depth 1 https://github.com/NathanWalker/angular2-seed-advanced.git
cd angular2-seed-advanced

# install the project's dependencies
npm install
# watches your files and uses livereload by default
npm start
# api document for the app
npm run docs

# dev build
npm run build.dev
# prod build
npm run build.prod
```

## Using the experimental hot loader support

If you want to try the experimental [hot loading](http://blog.mgechev.com/2015/10/26/angular2-hot-loader-hot-loading-tooling/) support use:

```
npm start -- --hot-loader true
```

Note that the hot loader is still in experimental phase of development and there are some missing features. If you experience any issues with it report them at [here](https://github.com/mgechev/angular2-hot-loader/issues).

_Does not rely on any global dependencies._

# Table of Content

- [Introduction](#introduction)
- [How to start](#how-to-start)
  * [Using the experimental hot loader support](#using-the-experimental-hot-loader-support)
- [Table of Content](#table-of-content)
- [Configuration](#configuration)
- [How to extend?](#how-to-extend)
- [Running test](#running-test)
- [Contributing](#contributing)
- [Change Log](#change-log)
- [License](#license)

# Configuration

Default application server configuration

```javascript
var PORT             = 5555;
var LIVE_RELOAD_PORT = 4002;
var DOCS_PORT        = 4003;
var APP_BASE         = '/';
```

Configure at runtime

```bash
npm start -- --port 8080 --reload-port 4000 --base /my-app/
```

# Running test

```bash
npm test

# Debug - In two different shell windows
npm run build.test.watch      # 1st window
npm run karma.start           # 2nd window

# e2e (aka. end-to-end, integration) - In three different shell windows
npm start
# npm run webdriver-update <- You may need to run this the first time
npm run webdriver-start
npm run e2e

# e2e live mode - Protractor interactive mode
# Instead of last command above, you can use:
npm run e2e-live
```
You can learn more about [Protractor Interactive Mode here](https://github.com/angular/protractor/blob/master/docs/debugging.md#testing-out-protractor-interactively)

# Contributing

Please see the [CONTRIBUTING](https://github.com/NathanWalker/angular2-seed-advanced/blob/master/CONTRIBUTING.md) file for guidelines.

# Changelog

You can follow the [Angular 2 change log here](https://github.com/angular/angular/blob/master/CHANGELOG.md).

# License

MIT