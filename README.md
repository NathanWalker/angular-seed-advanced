## angular2-seed-advanced
![Angular 2 Seed Advanced](/angular-advanced-logo.png)![Angular 2 Seed Advanced Integrations](/integrations.png)

#### Please note: This is very much a wip.

An **advanced** seed project for Angular 2 apps grown out of [Minko Gechev's](https://github.com/mgechev) [angular2-seed](https://github.com/mgechev/angular2-seed). This seed inherits all the genetics of its parent and will continually grow alongside it mirroring any changes to the underlying roots.

**Advice**: If your project is intended to target a single platform (i.e, web only), then [angular2-seed](https://github.com/mgechev/angular2-seed) is likely more than suitable for your needs. However if your project goals are to target multiple platforms (web, native mobile and native desktop), with powerful out of the box library support and highly configurable/flexible testing options, then you might want to keep reading.

### Features

Provides all features available in [angular2-seed](https://github.com/mgechev/angular2-seed) with the following enhancements:

#### Integration with:
- [lodash](https://lodash.com/)
- [ng2-translate](https://github.com/ocombe/ng2-translate) for i18n

#### Coming Soon...
- [ ] [ngrx/store](https://github.com/ngrx/store) for state management (Redux)
- [ ] [NativeScript](https://www.nativescript.org/) bootstrap ability for cross platform mobile apps.
- [ ] [Electron](http://electron.atom.io/) bootstrap ability for cross platform desktop apps.
- [ ] [angular cli](https://github.com/angular/angular-cli) to help in component, service, pipe creation, etc. (it does `not` use it for the build)
- [ ] provider for LocalStorage (abstraction for IndexedDB, WebSQL, localStorage, perhaps a port of localForage)
- [ ] sophisticated setup for Service Worker
- [ ] integration with [ng2-bootstrap](https://github.com/valor-software/ng2-bootstrap)

#### Enhanced development workflow
- Decorators for components which reduce boilerplate for common component setups
- Introduction of `frameworks` to help organize your code for different platforms:
    - `app.framework`: your shared application architecture code
    - `desktop.framework`: **coming soon**... [Electron](http://electron.atom.io/) specific code
    - `mobile.framework`: **coming soon**...[NativeScript](https://www.nativescript.org/) specific code
    - `web.framework`: web specific code
    - `test.framework`: test specific code providing conveniences to make testing your code easier and faster 

#### Enhanced testing support options
- mocks for various services
- configurable provider blocks for easy test setup of common application providers
  - tired of setting up similar providers over and over again for different tests?
  - configure a reusable test provider which can be configured on a case-by-base basis
  - see [example here](https://github.com/NathanWalker/angular2-seed-advanced/blob/development/src/frameworks/test.framework/_providers.ts#L45-L78)
  - watch [video explanation **coming soon**](https://github.com/NathanWalker/angular2-seed-advanced)
- helpers for end-to-end (e2e, integration) tests
- convenient shorthand to reduce test setup boilerplate and enhance speed of writing tests
  - are your test cases buried by multiple import lines requiring you to scroll just to get to the substance of the test?
  - removes noise allowing you to better focus on the substance of the test
  - provides full intellisense support
  - allows your team to add unique shorthands for various testing scenarios specific to your application needs
    - see [example here **coming soon**](https://github.com/NathanWalker/angular2-seed-advanced)
    - watch [video explanation **coming soon**](https://github.com/NathanWalker/angular2-seed-advanced)
  - plays nice with `tslint` options like `"no-unused-variable": true` as the api hangs off a plain `Object` instead of globals 
    - what's the value of that you ask? have you ever isolated a test with `iit` or `ddescribe` but didn't import those or vice versa, used `iit` leaving an unused `it` now in your tests? yeah, `tslint` will be all over you :/
    - avoids `unused` variable warnings altogether in tests since you are always using a valid key from the shorthand `Object`
  - see [example here](https://github.com/NathanWalker/angular2-seed-advanced/blob/development/src/frameworks/test.framework/shorthand/ng2-jasmine.ts)
  - watch [video explanation **coming soon**](https://github.com/NathanWalker/angular2-seed-advanced)


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
