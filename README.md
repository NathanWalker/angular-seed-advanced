![Angular 2 Seed Advanced](https://d2wp4shknjcfjl.cloudfront.net/api/file/olEzxJQ2KcXrZHzbt9UA)![Angular 2 Seed Advanced Integrations](https://d2wp4shknjcfjl.cloudfront.net/api/file/SPLl77rSTuGZ7APrXizi)

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![Build Status](https://travis-ci.org/NathanWalker/angular2-seed-advanced.svg?branch=master)](https://travis-ci.org/NathanWalker/angular2-seed-advanced)
[![Build Status](https://ci.appveyor.com/api/projects/status/github/NathanWalker/angular2-seed-advanced?svg=true&branch=master)](https://ci.appveyor.com/project/NathanWalker/angular2-seed-advanced)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/NathanWalker/angular2-seed-advanced.svg)](https://david-dm.org/NathanWalker/angular2-seed-advanced)
[![devDependency Status](https://david-dm.org/NathanWalker/angular2-seed-advanced/dev-status.svg)](https://david-dm.org/NathanWalker/angular2-seed-advanced#info=devDependencies)
[![Stack Share](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/NathanWalker/angular-2-seed-advanced)
[![Stories in Progress](https://badge.waffle.io/NathanWalker/angular2-seed-advanced.png?label=in%20progress&title=Stories%20In%20Progress)](https://waffle.io/NathanWalker/angular2-seed-advanced)

#### Considering [Angular 2](https://angular.io/) for a large project? Do you need potential i18n support? Enhanced testing support? Oh and building for multiple platforms too? Web, *native* Mobile (Android/iOS), and even Desktop (Mac, Windows and Linux)?  

This is an **advanced** seed project for Angular 2 apps based on [Minko Gechev's](https://github.com/mgechev) [angular2-seed](https://github.com/mgechev/angular2-seed) that expands on all of it's great features to include core support for:

#### Integration with:
- [ngrx/store](https://github.com/ngrx/store) RxJS powered state management, inspired by **Redux**
- [ngrx-store-router](https://github.com/CodeSequence/ngrx-store-router) middleware for syncing state with Angular 2 Router.
- [ng2-translate](https://github.com/ocombe/ng2-translate) for i18n 
  - Usage is optional but on by default
  - Up to you and your team how you want to utilize it. It can be easily removed if not needed. 
- [angulartics2](https://github.com/angulartics/angulartics2) Vendor-agnostic analytics for Angular2 applications.
  - Out of box support for [Segment](https://segment.com/)
    - When using the seed, be sure to change your `write_key` [here](https://github.com/NathanWalker/angular2-seed-advanced/blob/master/src/index.html#L18)
  - Can be changed to any vendor, [learn more here](https://github.com/angulartics/angulartics2#supported-providers)
- [lodash](https://lodash.com/) Helps reduce blocks of code down to single lines and enhances readability
- [NativeScript](https://www.nativescript.org/) cross platform mobile (w/ native UI) apps. [Setup instructions here](#run-nativescript-app).
- [Electron](http://electron.atom.io/) cross platform desktop apps (Mac, Windows and Linux). [Setup instructions here](#run-electron-app).

| ![Multiple Platforms](https://d2wp4shknjcfjl.cloudfront.net/api/file/ihp3WyiqS1WdRYaBEYKn) |
| :---: |
| *The zen of multiple platforms.* Chrome, Android and iPhone all running the same code. |

| ![Desktop](https://d2wp4shknjcfjl.cloudfront.net/api/file/1O4FRGsSHS8g0Lz3EKNy) |
| :---: |
| *Programming Nirvana.* Mac and Windows desktop both running the same code. |

# Table of Contents

- [Enhanced development workflow](#enhanced-development-workflow)
- [Enhanced testing support options](#enhanced-testing-support-options)
- [Additional features coming soon...](#additional-features-coming-soon)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [NativeScript App](#nativescript-app)
- [Electron App](#electron-app)
- [Testing](#testing)
- [Web Configuration Options](#web-configuration-options)
- [How best to use for your project](#how-best-to-use-for-your-project)
- [Contributing](#contributing)
- [License](#license)

#### Enhanced development workflow
- Decorators for components which reduce boilerplate for common component setups
- Introduction of `frameworks` to help organize your code for different platforms:
  - `app.framework`: your shared application architecture code (grow your app here or create new frameworks)
  - `core.framework`: foundation layer (decorators and low-level services)
  - `i18n.framework`: internationalization features
  - `nativescript.framework`: [NativeScript](https://www.nativescript.org/) specific code
  - `electron.framework`: [Electron](http://electron.atom.io/) specific code
  - `test.framework`: test specific code providing conveniences to make testing your code easier and faster 

#### Enhanced testing support options
- mocks for various services
- configurable provider blocks for easy test setup of common application providers
  - tired of setting up similar providers over and over again for different tests?
  - configure a reusable test provider which can be configured on a case-by-base basis
  - see [example here](https://github.com/NathanWalker/angular2-seed-advanced/blob/master/src/frameworks/test.framework/providers/component.ts)
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
  - see [example here](https://github.com/NathanWalker/angular2-seed-advanced/blob/master/src/frameworks/test.framework/shorthand/ng2-jasmine.ts)
  - watch [video explanation **coming soon**](https://github.com/NathanWalker/angular2-seed-advanced)
  
**Advice**: If your project is intended to target a single platform (i.e, web only), then [angular2-seed](https://github.com/mgechev/angular2-seed) is likely more than suitable for your needs. However if your project goals are to target multiple platforms (web, native mobile and native desktop), with powerful out of the box library support and highly configurable/flexible testing options, then you might want to keep reading.

#### Additional features coming soon...
- [ ] provider for LocalStorage (abstraction for IndexedDB, WebSQL, localStorage, perhaps a port of localForage)
- [ ] sophisticated setup for Service Worker

### Prerequisites

* node v5.x.x or higher and npm 3 or higher.

* To run the NativeScript app:

```
npm install -g nativescript
npm install -g typescript
```

## Usage


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

## NativeScript App

#### Setup

```
npm install -g nativescript 

// we set things up from the 'nativescript' directory
// at the moment, {N} does not use the seed build
cd nativescript  
tns install
```

#### Run

You will see TypeScript warnings when running the following commands. This is normal at the moment and you can ignore. This will be improved in the future.

* Mac users:

```
npm run start.ios   // iOS simulator

// or...

npm run start.android   // Android emulator*
```

* Windows users:

```
npm run start.ios.windows   // iOS simulator

// or...

npm run start.android.windows   // Android emulator* 
```

* Requires an image setup via AVD Manager. [Learn more here](http://developer.android.com/intl/zh-tw/tools/devices/managing-avds.html) and [here](https://github.com/NativeScript/nativescript-cli#the-commands).

## Electron App

#### Develop

* Mac:
```
npm run start.desktop
```

* Windows:
```
npm run start.desktop.windows
```

#### Release: Package Electron App for Mac, Windows or Linux

* Mac:
```
npm run build.desktop.mac
```

* Windows:
```
npm run build.desktop.windows
```

* Linux:
```
npm run build.desktop.linux
```

## Testing

```bash
npm test

# Debug - In two different shell windows
npm run build.test.watch      # 1st window
npm run karma.start           # 2nd window

# code coverage (istanbul)
# auto-generated at the end of `npm test`
# view coverage report:
npm run serve.coverage

# e2e (aka. end-to-end, integration) - In three different shell windows
# Make sure you don't have a global instance of Protractor

# npm run webdriver-update <- You will need to run this the first time
npm run webdriver-start
npm run serve.e2e
npm run e2e

# e2e live mode - Protractor interactive mode
# Instead of last command above, you can use:
npm run e2e.live
```
You can learn more about [Protractor Interactive Mode here](https://github.com/angular/protractor/blob/master/docs/debugging.md#testing-out-protractor-interactively)

## Web Configuration Options

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

## How best to use for your project

#### Setup

1. Download a zip of the seed. *This allows you to manually setup origin/upstream*
2. `git remote add origin ....your private repo....`
3. `git remote add upstream https://github.com/NathanWalker/angular2-seed-advanced.git`
4. Create a new `framework` for your application in `src/frameworks` to build your codebase out. Say your app is called `AwesomeApp`, then create `awesomeapp.framework` and start building out all your components and services in there. Create other frameworks as you see fit to organize.
5. If you don't want an integration that comes out of box with this seed; for example. let's say you don't want to use i18n. Then just delete the `i18n.framework`, remove `ng2-translate` as dependency root `package.json` and `nativescript/package.json`. Then remove the references to `i18n` throughout.
6. Remove `src/components` since those are just samples and create a new folder for your components, let's say `src/pages`. It's not absolutely necessary to remove and create a new differently named folder for your components but it might make merging in upstream changes a bit smoother.

You can read more about [configuring a remote for a fork here](https://help.github.com/articles/configuring-a-remote-for-a-fork/)

#### Merging latest upstream changes

1. `git fetch upstream`
2. `git merge upstream/master`  *you could rebase, but it wouldn't be worth it as the conflict resolution can often be more painful if there are conflicts*
3. Handle any conflicts to get latest upstream into your application. If you removed `src/components` as mentioned above, they may show back up when merging in latest upstream. You can just remove the folder again.
4. Continue building your app.

You can read more about [syncing a fork here](https://help.github.com/articles/syncing-a-fork/).

If you have any suggestions to this workflow, please post [here](https://github.com/NathanWalker/angular2-seed-advanced/issues).

## Contributing

Please see the [CONTRIBUTING](https://github.com/NathanWalker/angular2-seed-advanced/blob/master/CONTRIBUTING.md) file for guidelines.

## License

MIT