![Angular Seed Advanced](https://d2wp4shknjcfjl.cloudfront.net/api/file/olEzxJQ2KcXrZHzbt9UA)![Angular Seed Advanced Integrations](https://d2wp4shknjcfjl.cloudfront.net/api/file/SPLl77rSTuGZ7APrXizi)

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![Build Status](https://travis-ci.org/NathanWalker/angular-seed-advanced.svg?branch=master)](https://travis-ci.org/NathanWalker/angular-seed-advanced)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/NathanWalker/angular-seed-advanced.svg)](https://david-dm.org/NathanWalker/angular-seed-advanced)
[![devDependency Status](https://david-dm.org/NathanWalker/angular-seed-advanced/dev-status.svg)](https://david-dm.org/NathanWalker/angular-seed-advanced#info=devDependencies)
[![Stack Share](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/NathanWalker/angular-seed-advanced)
[![Stories in Progress](https://badge.waffle.io/NathanWalker/angular-seed-advanced.png?label=in%20progress&title=Stories%20In%20Progress)](https://waffle.io/NathanWalker/angular-seed-advanced)

#### Considering [Angular 2](https://angular.io/) for a large project? Do you need i18n support? Enhanced testing support? Oh and building for multiple platforms too? Web, *native* Mobile (Android/iOS), and even Desktop (Mac, Windows and Linux)?  

This is an **advanced** seed project for Angular 2 apps based on [Minko Gechev's](https://github.com/mgechev) [angular-seed](https://github.com/mgechev/angular-seed) that expands on all of its great features to include core support for:

#### Integration with:
- [ngrx/store](https://github.com/ngrx/store) RxJS powered state management, inspired by **Redux**
- [ngrx/effects](https://github.com/ngrx/effects) Side effect model for @ngrx/store
- [ng2-translate](https://github.com/ocombe/ng2-translate) for i18n 
  - Usage is optional but on by default
  - Up to you and your team how you want to utilize it. It can be easily removed if not needed. 
- [angulartics2](https://github.com/angulartics/angulartics2) Vendor-agnostic analytics for Angular2 applications.
  - Out of box support for [Segment](https://segment.com/)
    - When using the seed, be sure to change your `write_key` [here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/index.html#L24)
  - Can be changed to any vendor, [learn more here](https://github.com/angulartics/angulartics2#supported-providers)
- [lodash](https://lodash.com/) Helps reduce blocks of code down to single lines and enhances readability
- [NativeScript](https://www.nativescript.org/) cross platform mobile (w/ native UI) apps. [Setup instructions here](#nativescript-app).
- [Electron](http://electron.atom.io/) cross platform desktop apps (Mac, Windows and Linux). [Setup instructions here](#electron-app).

| ![Multiple Platforms](https://cdn.filestackcontent.com/zZlQKKKjQUaBr9pLkEVK) |
| :---: |
| *The zen of multiple platforms.* Chrome, Android and iPhone all running the same code. |

| ![Desktop](https://d2wp4shknjcfjl.cloudfront.net/api/file/1O4FRGsSHS8g0Lz3EKNy) |
| :---: |
| *Programming Nirvana.* Mac and Windows desktop both running the same code. |

# Table of Contents

- [Enhanced development workflow](#enhanced-development-workflow)
- [Enhanced testing support options](#enhanced-testing-support-options)
- [Prerequisites](#prerequisites)
- [How to start](#how-to-start)
- [How to start with AoT compilation](#how-to-start-with-aot-compilation)
- [NativeScript App](#nativescript-app)
- [Electron App](#electron-app)
- [Running tests](#running-tests)
- [Framework How-Tos](#framework-how-tos)
- [Web Configuration Options](#web-configuration-options)
- [Change Detection OnPush Note](#change-detection-onpush-note)
- [General Best Practice Guide to Sharing Code](#general-best-practice-guide-to-sharing-code)
- [Feature Branches](#feature-branches)
- [Integration Guides](https://github.com/NathanWalker/angular-seed-advanced/wiki)
- [How best to use for your project](#how-best-to-use-for-your-project)
- [Contributing](#contributing)
- [License](#license)

#### Enhanced development workflow
- Decorators for components which reduce boilerplate for common component setups
- Shared code can be found in `frameworks`:
  - `core`: foundation layer (decorators and low-level services)
  - `analytics`: analytics provided by [Segment](https://segment.com/)
    - Only reports data in **production** build
  - `i18n`: internationalization features
  - `electron`: [Electron](http://electron.atom.io/) specific code
  - `sample`: Just a sample module providing some components and services
  - `test`: test specific code providing conveniences to make testing your code easier and faster 

#### Enhanced testing support options
- mocks for various services
- configurable provider blocks for easy test setup of common application providers
  - tired of setting up similar providers over and over again for different tests?
  - configure a reusable test provider which can be configured on a case-by-base basis
  - see [example here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/app/frameworks/core/testing/providers/core.ts)
- helpers for end-to-end (e2e, integration) tests
- convenient shorthand to reduce test setup boilerplate and enhance speed of writing tests
  - are your test cases buried by multiple import lines requiring you to scroll just to get to the substance of the test?
  - removes noise allowing you to better focus on the substance of the test
  - provides full intellisense support
  - allows your team to add unique shorthands for various testing scenarios specific to your application needs
  - plays nice with `tslint` options like `"no-unused-variable": true` as the api hangs off a plain `Object` instead of globals 
    - what's the value of that you ask? have you ever isolated a test with `iit` or `ddescribe` but didn't import those or vice versa, used `iit` leaving an unused `it` now in your tests? yeah, `tslint` will be all over you :/
    - avoids `unused` variable warnings altogether in tests since you are always using a valid key from the shorthand `Object`
  - see [example here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/app/frameworks/test/shorthand/ng2-jasmine.ts)
  
**Advice**: If your project is intended to target a single platform (i.e, web only), then [angular-seed](https://github.com/mgechev/angular-seed) is likely more than suitable for your needs. However if your project goals are to target multiple platforms (web, native mobile and native desktop), with powerful out of the box library support and highly configurable/flexible testing options, then you might want to keep reading.

Additionally, this seed is intended to push a couple boundaries so if you see dependencies that are *bleeding edge*, this is intentional.

### Prerequisites

* node v5.x.x or higher and npm 3 or higher.

* To run the NativeScript app:

```
npm install -g nativescript
npm install -g typescript
```

## How to start


```bash
git clone --depth 1 https://github.com/NathanWalker/angular-seed-advanced.git
cd angular-seed-advanced

# install the project's dependencies
$ npm install
# fast install (via Yarn, https://yarnpkg.com)
$ yarn install  # or yarn

# watches your files and uses livereload by default
$ npm start
# api document for the app
# npm run build.docs

# to start deving with livereload site and coverage as well as continuous testing
$ npm run start.deving

# dev build
$ npm run build.dev
# prod build
$ npm run build.prod
```

## How to start with AoT compilation

**Note** that AoT compilation requires **node v6.5.0 or higher** and **npm 3.10.3 or higher**.

In order to start the seed with AoT use:

```bash
# prod build with AoT compilation
$ npm run build.prod.exp
```

When using AoT compilation, please consider the following:

Currently you cannot use custom component decorators with AoT compilation. This may change in the future but for now you can use this pattern for when you need to create AoT builds for the web:

```
import { Component } from '@angular/core';
import { BaseComponent } from '../frameworks/core/index';

// @BaseComponent({   // just comment this out and use Component from 'angular/core'
@Component({
  // etc.
```

After doing the above, running AoT build via `npm run build.prod.exp` will succeed. :)

`BaseComponent` custom component decorator does the auto `templateUrl` switching to use {N} views when running in the {N} app therefore you don't need it when creating AoT builds for the web. However just note that when going back to run your {N} app, you should comment back in the `BaseComponent`. Again this temporary inconvenience may be unnecessary in the future.

## NativeScript App

#### Setup

```
npm install -g nativescript 
```

#### Dev Workflow

You can make changes to files in `src/client` or `nativescript` folders. A symbolic link exists between the web `src/client` and the `nativescript` folder so changes in either location are mirrored because they are the same directory inside.

Create `.tns.html` and `.tns.css` NativeScript view files for every web component view file you have. You will see an example of the `app.component.html` as a [NativeScript view file here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/app/components/app.component.tns.html).

#### Run

```
iOS:                      npm run start.ios
iOS (livesync emulator):  npm run start.livesync.ios
iOS (livesync device):    npm run start.livesync.ios.device

// or...

Android:                      npm run start.android
Android (livesync emulator):  npm run start.livesync.android
Android (livesync device):    npm run start.livesync.android.device
```

* Requires an image setup via AVD Manager. [Learn more here](http://developer.android.com/intl/zh-tw/tools/devices/managing-avds.html) and [here](https://github.com/NativeScript/nativescript-cli#the-commands).

OR...

* [GenyMotion Android Emulator](https://www.genymotion.com/)

##### Building with Webpack for release builds

You can greatly reduce the final size of your NativeScript app by the following:

```
cd nativescript
npm i nativescript-dev-webpack --save-dev
```
Then you will need to modify your components to *not* use `moduleId: module.id` and change `templateUrl` to true relative app, for example:

before:

```
@BaseComponent({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
```
after:

```
@BaseComponent({
  // moduleId: module.id,
  selector: 'sd-home',
  templateUrl: './app/components/home/home.component.html',
  styleUrls: ['./app/components/home/home.component.css']
})
```

Then to build:

Ensure you are in the `nativescript` directory when running these commands.

* iOS: `WEBPACK_OPTS="--display-error-details" tns build ios --bundle`
* Android: `WEBPACK_OPTS="--display-error-details" tns build android --bundle`

Notice your final build will be drastically smaller. In some cases 120 MB -> ~28 MB. 👍 

## Electron App

#### Develop

```
Mac:      npm run start.desktop
Windows:  npm run start.desktop.windows
```

#### Develop with livesync
```
Mac:      npm run start.livesync.desktop
Windows:  npm run start.livesync.desktop.windows
```

#### Release: Package Electron App for Mac, Windows or Linux

```
Mac:      npm run build.desktop.mac
Windows:  npm run build.desktop.windows
Linux:    npm run build.desktop.linux
```

## Running tests

```bash
$ npm test

# Development. Your app will be watched by karma
# on each change all your specs will be executed.
$ npm run test.watch
# NB: The command above might fail with a "EMFILE: too many open files" error.
# Some OS have a small limit of opened file descriptors (256) by default
# and will result in the EMFILE error.
# You can raise the maximum of file descriptors by running the command below:
$ ulimit -n 10480


# code coverage (istanbul)
# auto-generated at the end of `npm test`
# view coverage report:
$ npm run serve.coverage

# e2e (aka. end-to-end, integration) - In three different shell windows
# Make sure you don't have a global instance of Protractor

# npm install webdriver-manager <- Install this first for e2e testing
# npm run webdriver-update <- You will need to run this the first time
$ npm run webdriver-start
$ npm run serve.e2e
$ npm run e2e

# e2e live mode - Protractor interactive mode
# Instead of last command above, you can use:
$ npm run e2e.live
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

## Environment configuration

If you have different environments and you need to configure them to use different end points, settings, etc. you can use the files `dev.ts` or `prod.ts` in`./tools/env/`. The name of the file is environment you want to use.

The environment can be specified by using:

```bash
$ npm start -- --env-config ENV_NAME
```

Currently the `ENV_NAME`s are `dev`, `prod`, `staging`, but you can simply add a different file `"ENV_NAME.ts".` file in order to alter extra such environments.

# Tools documentation

A documentation of the provided tools can be found in [tools/README.md](tools/README.md).

## Framework How-Tos

### i18n

* how to add a language?
  - `src/client/assets/i18n/`
    - add `[language code].json` (copy existing one and adapt the translation strings)
  - `src/client/app/frameworks/sample/services/app-config.spec.ts`
    - fix test
  - `src/client/app/frameworks/sample/services/app-config.ts`
    - add language to `SUPPORTED_LANGUAGES`
  - `src/client/app/frameworks/i18n/components/lang-switcher.component.spec.ts`
    - fix test

## Change Detection OnPush Note

*Please Note:* The seed uses Angular's `ChangeDetectionStrategy.OnPush` by default which requires some understanding of immutability and one-way data flows. Please check out the following resources to learn more:

* http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html
* http://victorsavkin.com/post/110170125256/change-detection-in-angular-2
* http://www.syntaxsuccess.com/viewarticle/change-detection-in-angular-2.0
* http://ngcourse.rangle.io/handout/change-detection/change_detection_strategy_onpush.html

If you experience issues with changes not occuring in your views, you can disable this by commenting out [these lines](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/app/frameworks/core/decorators/utils.ts#L43-L48). The seed uses `OnPush` by default because it  provides optimal performance and if you decide to turn it off while developing your application, you can always turn it back on when you're ready to refactor your data services to utilize `OnPush` properly.

## General Best Practice Guide to Sharing Code 

There’s actually only a few things to keep in mind when sharing code between web/mobile. The seed does take care of quite a few of those things but here’s a brief list:

* Don’t import {N} modules into your components/services. {N} modules can only be used inside the {N} app therefore cannot be shared. To get around this, use `OpaqueTokens` which is a fancy name for something quite simple. [Learn more here](http://blog.thoughtram.io/angular/2016/05/23/opaque-tokens-in-angular-2.html). A great example of how to integrate 2 different plugins (1 for web, 1 for {N}) and share all the code exists in [this wiki article: How to integrate Firebase across all platforms](https://github.com/NathanWalker/angular-seed-advanced/wiki/How-to-integrate-Firebase-across-all-platforms-(web-nativescript-desktop)) written by the awesome [Scott Lowe](https://twitter.com/scott_d_lowe).
* Use the conditional hooks provided by the seed in shared methods where you may need to handle something differently in {N} than you do on the web. For example, see [here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/app/frameworks/i18n/components/lang-switcher.component.ts#L35-L41).
* Don’t use window global. Inject the `WindowService` provided by the seed instead. This includes usage of `alert`, `confirm`, etc. For example:

If you were thinking about doing: `alert('Something happened!');`, *Don't*.
Instead inject `WindowService`:
```
constructor(private win: WindowService) {}

public userAction() {
  if (success) {
    // do stuff
  } else {
    this.win.alert('Something happened!');
  }
}
```

This ensures that when the same code is run in the {N} app, the native `dialogs` module will be used.

* Lastly, understand this video: http://www.nativescriptsnacks.com/videos/2016/06/13/zoned-callbacks.html … As far as dealing with {N} and 3rd party plugins, you want to understand that.

The advice I like to give is:

> Code with web mentality first. Then provide the native capability using Angular’s `{provide: SomeWebService, useClass: SomeNativeService }` during bootstrap.

There are some cases where you may want to use `useValue` vs. `useClass`, and other times may need to use `useFactory`. Read [the Angular docs here to learn more about which you may need for your use case](https://angular.io/docs/ts/latest/cookbook/dependency-injection.html#!#provide).

## Feature Branches

Several branches exist with certain features integrated:

* [ui-router-ng2](https://github.com/NathanWalker/angular-seed-advanced/tree/ui-router)

## How best to use for your project

#### Setup

*NOTE*: This should be done first before you start making any changes and building out your project. Not doing so will likely result in dificulty when trying to merge in upstream changes later.

1. Download a zip of the seed. (**Do not fork**)
2. `npm run git.setup` - This will initialize `git` as well as setup `upstream` properly.
3. `git remote add origin ...your private repo...`
4. `npm run git.prepare` - This will prepare git to handle the merge
5. `npm run git.merge` - This will fetch upstream and run the first merge (*Important)
  * IMPORTANT: You will see a wall of Conflicts after doing above (a Conflict for every single file). This is normal. There actually will not be any problematic conflicts as it's just reporting every single file which both sides (`upstream` and your first commit) added.
  * IMPORTANT: If you see `unknown option --allow-unrelated-histories` either upgrade git to 2.9+ or use `npm run git.merge.legacy`
6. `git add .; git commit -m'ready'`. **Yes**, you will be committing all those conflicts, which actually are not a problem in this 1 time case.
7. Now you have `git` setup and ready to develop your application as well as merge in upstream changes in the future.
8. `npm install` (and all other usage docs in this `README` apply)
9. Create a new `framework` for your application in `src/client/app/frameworks` to build your codebase out. Say your app is called `AwesomeApp`, then create `awesomeapp` and start building out all your components and services in there. Create other frameworks as you see fit to organize.
10. If you don't want an integration that comes out of box with this seed; for example. let's say you don't want to use i18n. Then just delete the `i18n`, remove `ng2-translate` as dependency root `package.json` and `nativescript/package.json`. Then remove any references to `i18n` throughout.

#### Merging latest upstream changes

1. `npm run git.merge.preview` - This will fetch `upstream` and show you how the merge would look
  * If you see `unknown option --allow-unrelated-histories` either upgrade git to 2.9+ or use `npm run git.merge.legacy.preview`
2. `npm run git.merge` - This will actually do the merge
  * If you see `unknown option --allow-unrelated-histories` either upgrade git to 2.9+ or use `npm run git.merge.legacy`
3. Handle any conflicts to get latest upstream into your application.
4. Continue building your app.

You can read more about [syncing a fork here](https://help.github.com/articles/syncing-a-fork/).

If you have any suggestions to this workflow, please post [here](https://github.com/NathanWalker/angular-seed-advanced/issues).

## Contributing

Please see the [CONTRIBUTING](https://github.com/NathanWalker/angular-seed-advanced/blob/master/CONTRIBUTING.md) file for guidelines.

# Awesome Contributors

[<img alt="mgechev" src="https://avatars.githubusercontent.com/u/455023?v=3&s=117" width="117">](https://github.com/mgechev) |[<img alt="ludohenin" src="https://avatars.githubusercontent.com/u/1011516?v=3&s=117" width="117">](https://github.com/ludohenin) |[<img alt="NathanWalker" src="https://avatars.githubusercontent.com/u/457187?v=3&s=117" width="117">](https://github.com/NathanWalker) |[<img alt="d3viant0ne" src="https://avatars.githubusercontent.com/u/8420490?v=3&s=117" width="117">](https://github.com/d3viant0ne) |[<img alt="Shyam-Chen" src="https://avatars.githubusercontent.com/u/13535256?v=3&s=117" width="117">](https://github.com/Shyam-Chen) |[<img alt="tarlepp" src="https://avatars.githubusercontent.com/u/595561?v=3&s=117" width="117">](https://github.com/tarlepp) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[ludohenin](https://github.com/ludohenin) |[NathanWalker](https://github.com/NathanWalker) |[d3viant0ne](https://github.com/d3viant0ne) |[Shyam-Chen](https://github.com/Shyam-Chen) |[tarlepp](https://github.com/tarlepp) |

[<img alt="Nightapes" src="https://avatars.githubusercontent.com/u/15911153?v=3&s=117" width="117">](https://github.com/Nightapes) |[<img alt="TheDonDope" src="https://avatars.githubusercontent.com/u/1188033?v=3&s=117" width="117">](https://github.com/TheDonDope) |[<img alt="nareshbhatia" src="https://avatars.githubusercontent.com/u/1220198?v=3&s=117" width="117">](https://github.com/nareshbhatia) |[<img alt="kiuka" src="https://avatars.githubusercontent.com/u/11283191?v=3&s=117" width="117">](https://github.com/kiuka) |[<img alt="hank-ehly" src="https://avatars.githubusercontent.com/u/11639738?v=3&s=117" width="117">](https://github.com/hank-ehly) |[<img alt="daniru" src="https://avatars.githubusercontent.com/u/2070853?v=3&s=117" width="117">](https://github.com/daniru) |
:---: |:---: |:---: |:---: |:---: |:---: |
[Nightapes](https://github.com/Nightapes) |[TheDonDope](https://github.com/TheDonDope) |[nareshbhatia](https://github.com/nareshbhatia) |[kiuka](https://github.com/kiuka) |[hank-ehly](https://github.com/hank-ehly) |[daniru](https://github.com/daniru) |

[<img alt="jesperronn" src="https://avatars.githubusercontent.com/u/6267?v=3&s=117" width="117">](https://github.com/jesperronn) |[<img alt="njs50" src="https://avatars.githubusercontent.com/u/55112?v=3&s=117" width="117">](https://github.com/njs50) |[<img alt="vyakymenko" src="https://avatars.githubusercontent.com/u/7300673?v=3&s=117" width="117">](https://github.com/vyakymenko) |[<img alt="robstoll" src="https://avatars.githubusercontent.com/u/5557885?v=3&s=117" width="117">](https://github.com/robstoll) |[<img alt="sasikumardr" src="https://avatars.githubusercontent.com/u/1760104?v=3&s=117" width="117">](https://github.com/sasikumardr) |[<img alt="aboeglin" src="https://avatars.githubusercontent.com/u/8297302?v=3&s=117" width="117">](https://github.com/aboeglin) |
:---: |:---: |:---: |:---: |:---: |:---: |
[jesperronn](https://github.com/jesperronn) |[njs50](https://github.com/njs50) |[vyakymenko](https://github.com/vyakymenko) |[robstoll](https://github.com/robstoll) |[sasikumardr](https://github.com/sasikumardr) |[aboeglin](https://github.com/aboeglin) |

[<img alt="sfabriece" src="https://avatars.githubusercontent.com/u/3108592?v=3&s=117" width="117">](https://github.com/sfabriece) |[<img alt="JakePartusch" src="https://avatars.githubusercontent.com/u/6424140?v=3&s=117" width="117">](https://github.com/JakePartusch) |[<img alt="ryzy" src="https://avatars.githubusercontent.com/u/994940?v=3&s=117" width="117">](https://github.com/ryzy) |[<img alt="markwhitfeld" src="https://avatars.githubusercontent.com/u/1948265?v=3&s=117" width="117">](https://github.com/markwhitfeld) |[<img alt="m-abs" src="https://avatars.githubusercontent.com/u/1348705?v=3&s=117" width="117">](https://github.com/m-abs) |[<img alt="eppsilon" src="https://avatars.githubusercontent.com/u/5643?v=3&s=117" width="117">](https://github.com/eppsilon) |
:---: |:---: |:---: |:---: |:---: |:---: |
[sfabriece](https://github.com/sfabriece) |[JakePartusch](https://github.com/JakePartusch) |[ryzy](https://github.com/ryzy) |[markwhitfeld](https://github.com/markwhitfeld) |[m-abs](https://github.com/m-abs) |[eppsilon](https://github.com/eppsilon) |

[<img alt="jvitor83" src="https://avatars.githubusercontent.com/u/3493339?v=3&s=117" width="117">](https://github.com/jvitor83) |[<img alt="gkalpak" src="https://avatars.githubusercontent.com/u/8604205?v=3&s=117" width="117">](https://github.com/gkalpak) |[<img alt="ivannugo" src="https://avatars.githubusercontent.com/u/8823899?v=3&s=117" width="117">](https://github.com/ivannugo) |[<img alt="pgrzeszczak" src="https://avatars.githubusercontent.com/u/3300099?v=3&s=117" width="117">](https://github.com/pgrzeszczak) |[<img alt="natarajanmca11" src="https://avatars.githubusercontent.com/u/9244766?v=3&s=117" width="117">](https://github.com/natarajanmca11) |[<img alt="natarajanmca11" src="https://avatars.githubusercontent.com/u/9244766?v=3&s=117" width="117">](https://github.com/natarajanmca11) |
:---: |:---: |:---: |:---: |:---: |:---: |
[jvitor83](https://github.com/jvitor83) |[gkalpak](https://github.com/gkalpak) |[ivannugo](https://github.com/ivannugo) |[pgrzeszczak](https://github.com/pgrzeszczak) |[natarajanmca11](https://github.com/natarajanmca11) |[natarajanmca11](https://github.com/natarajanmca11) |

[<img alt="jerryorta-dev" src="https://avatars.githubusercontent.com/u/341155?v=3&s=117" width="117">](https://github.com/jerryorta-dev) |[<img alt="domfarolino" src="https://avatars.githubusercontent.com/u/9669289?v=3&s=117" width="117">](https://github.com/domfarolino) |[<img alt="larsthorup" src="https://avatars.githubusercontent.com/u/1202959?v=3&s=117" width="117">](https://github.com/larsthorup) |[<img alt="ouq77" src="https://avatars.githubusercontent.com/u/1796191?v=3&s=117" width="117">](https://github.com/ouq77) |[<img alt="LuxDie" src="https://avatars.githubusercontent.com/u/12536671?v=3&s=117" width="117">](https://github.com/LuxDie) |[<img alt="admosity" src="https://avatars.githubusercontent.com/u/4655972?v=3&s=117" width="117">](https://github.com/admosity) |
:---: |:---: |:---: |:---: |:---: |:---: |
[jerryorta-dev](https://github.com/jerryorta-dev) |[domfarolino](https://github.com/domfarolino) |[larsthorup](https://github.com/larsthorup) |[ouq77](https://github.com/ouq77) |[LuxDie](https://github.com/LuxDie) |[admosity](https://github.com/admosity) |

[<img alt="irsick" src="https://avatars.githubusercontent.com/u/1380457?v=3&s=117" width="117">](https://github.com/irsick) |[<img alt="amedinavalencia" src="https://avatars.githubusercontent.com/u/21317797?v=3&s=117" width="117">](https://github.com/amedinavalencia) |[<img alt="troyanskiy" src="https://avatars.githubusercontent.com/u/1538862?v=3&s=117" width="117">](https://github.com/troyanskiy) |[<img alt="tsm91" src="https://avatars.githubusercontent.com/u/4459551?v=3&s=117" width="117">](https://github.com/tsm91) |[<img alt="juristr" src="https://avatars.githubusercontent.com/u/542458?v=3&s=117" width="117">](https://github.com/juristr) |[<img alt="JohnCashmore" src="https://avatars.githubusercontent.com/u/2050794?v=3&s=117" width="117">](https://github.com/JohnCashmore) |
:---: |:---: |:---: |:---: |:---: |:---: |
[irsick](https://github.com/irsick) |[amedinavalencia](https://github.com/amedinavalencia) |[troyanskiy](https://github.com/troyanskiy) |[tsm91](https://github.com/tsm91) |[juristr](https://github.com/juristr) |[JohnCashmore](https://github.com/JohnCashmore) |

[<img alt="JayKan" src="https://avatars.githubusercontent.com/u/1400300?v=3&s=117" width="117">](https://github.com/JayKan) |[<img alt="devanp92" src="https://avatars.githubusercontent.com/u/4533277?v=3&s=117" width="117">](https://github.com/devanp92) |[<img alt="evanplaice" src="https://avatars.githubusercontent.com/u/303159?v=3&s=117" width="117">](https://github.com/evanplaice) |[<img alt="hAWKdv" src="https://avatars.githubusercontent.com/u/4449497?v=3&s=117" width="117">](https://github.com/hAWKdv) |[<img alt="Kaffiend" src="https://avatars.githubusercontent.com/u/7826229?v=3&s=117" width="117">](https://github.com/Kaffiend) |[<img alt="JunaidZA" src="https://avatars.githubusercontent.com/u/16782593?v=3&s=117" width="117">](https://github.com/JunaidZA) |
:---: |:---: |:---: |:---: |:---: |:---: |
[JayKan](https://github.com/JayKan) |[devanp92](https://github.com/devanp92) |[evanplaice](https://github.com/evanplaice) |[hAWKdv](https://github.com/hAWKdv) |[Kaffiend](https://github.com/Kaffiend) |[JunaidZA](https://github.com/JunaidZA) |

[<img alt="c-ice" src="https://avatars.githubusercontent.com/u/347238?v=3&s=117" width="117">](https://github.com/c-ice) |[<img alt="markharding" src="https://avatars.githubusercontent.com/u/851436?v=3&s=117" width="117">](https://github.com/markharding) |[<img alt="ojacquemart" src="https://avatars.githubusercontent.com/u/1189345?v=3&s=117" width="117">](https://github.com/ojacquemart) |[<img alt="tiagomapmarques" src="https://avatars.githubusercontent.com/u/704002?v=3&s=117" width="117">](https://github.com/tiagomapmarques) |[<img alt="TuiKiken" src="https://avatars.githubusercontent.com/u/959821?v=3&s=117" width="117">](https://github.com/TuiKiken) |[<img alt="gotenxds" src="https://avatars.githubusercontent.com/u/3519520?v=3&s=117" width="117">](https://github.com/gotenxds) |
:---: |:---: |:---: |:---: |:---: |:---: |
[c-ice](https://github.com/c-ice) |[markharding](https://github.com/markharding) |[ojacquemart](https://github.com/ojacquemart) |[tiagomapmarques](https://github.com/tiagomapmarques) |[TuiKiken](https://github.com/TuiKiken) |[gotenxds](https://github.com/gotenxds) |

[<img alt="edud69" src="https://avatars.githubusercontent.com/u/1514745?v=3&s=117" width="117">](https://github.com/edud69) |[<img alt="turbohappy" src="https://avatars.githubusercontent.com/u/437299?v=3&s=117" width="117">](https://github.com/turbohappy) |[<img alt="karlhaas" src="https://avatars.githubusercontent.com/u/7677394?v=3&s=117" width="117">](https://github.com/karlhaas) |[<img alt="kbrandwijk" src="https://avatars.githubusercontent.com/u/852069?v=3&s=117" width="117">](https://github.com/kbrandwijk) |[<img alt="robbatt" src="https://avatars.githubusercontent.com/u/1379424?v=3&s=117" width="117">](https://github.com/robbatt) |[<img alt="Bigous" src="https://avatars.githubusercontent.com/u/6886560?v=3&s=117" width="117">](https://github.com/Bigous) |
:---: |:---: |:---: |:---: |:---: |:---: |
[edud69](https://github.com/edud69) |[turbohappy](https://github.com/turbohappy) |[karlhaas](https://github.com/karlhaas) |[kbrandwijk](https://github.com/kbrandwijk) |[robbatt](https://github.com/robbatt) |[Bigous](https://github.com/Bigous) |

[<img alt="ip512" src="https://avatars.githubusercontent.com/u/1699735?v=3&s=117" width="117">](https://github.com/ip512) |[<img alt="Green-Cat" src="https://avatars.githubusercontent.com/u/3328823?v=3&s=117" width="117">](https://github.com/Green-Cat) |[<img alt="Yonet" src="https://avatars.githubusercontent.com/u/3523671?v=3&s=117" width="117">](https://github.com/Yonet) |[<img alt="divramod" src="https://avatars.githubusercontent.com/u/1331662?v=3&s=117" width="117">](https://github.com/divramod) |[<img alt="daixtrose" src="https://avatars.githubusercontent.com/u/5588692?v=3&s=117" width="117">](https://github.com/daixtrose) |[<img alt="taguan" src="https://avatars.githubusercontent.com/u/1026937?v=3&s=117" width="117">](https://github.com/taguan) |
:---: |:---: |:---: |:---: |:---: |:---: |
[ip512](https://github.com/ip512) |[Green-Cat](https://github.com/Green-Cat) |[Yonet](https://github.com/Yonet) |[divramod](https://github.com/divramod) |[daixtrose](https://github.com/daixtrose) |[taguan](https://github.com/taguan) |

[<img alt="bbarry" src="https://avatars.githubusercontent.com/u/84951?v=3&s=117" width="117">](https://github.com/bbarry) |[<img alt="yassirh" src="https://avatars.githubusercontent.com/u/4649139?v=3&s=117" width="117">](https://github.com/yassirh) |[<img alt="sonicparke" src="https://avatars.githubusercontent.com/u/1139721?v=3&s=117" width="117">](https://github.com/sonicparke) |[<img alt="brendanbenson" src="https://avatars.githubusercontent.com/u/866866?v=3&s=117" width="117">](https://github.com/brendanbenson) |[<img alt="brian428" src="https://avatars.githubusercontent.com/u/140338?v=3&s=117" width="117">](https://github.com/brian428) |[<img alt="briantopping" src="https://avatars.githubusercontent.com/u/158115?v=3&s=117" width="117">](https://github.com/briantopping) |
:---: |:---: |:---: |:---: |:---: |:---: |
[bbarry](https://github.com/bbarry) |[yassirh](https://github.com/yassirh) |[sonicparke](https://github.com/sonicparke) |[brendanbenson](https://github.com/brendanbenson) |[brian428](https://github.com/brian428) |[briantopping](https://github.com/briantopping) |

[<img alt="ckapilla" src="https://avatars.githubusercontent.com/u/451875?v=3&s=117" width="117">](https://github.com/ckapilla) |[<img alt="cadriel" src="https://avatars.githubusercontent.com/u/205520?v=3&s=117" width="117">](https://github.com/cadriel) |[<img alt="dszymczuk" src="https://avatars.githubusercontent.com/u/539352?v=3&s=117" width="117">](https://github.com/dszymczuk) |[<img alt="dmurat" src="https://avatars.githubusercontent.com/u/470930?v=3&s=117" width="117">](https://github.com/dmurat) |[<img alt="peah90" src="https://avatars.githubusercontent.com/u/4435255?v=3&s=117" width="117">](https://github.com/peah90) |[<img alt="dstockhammer" src="https://avatars.githubusercontent.com/u/1156637?v=3&s=117" width="117">](https://github.com/dstockhammer) |
:---: |:---: |:---: |:---: |:---: |:---: |
[ckapilla](https://github.com/ckapilla) |[cadriel](https://github.com/cadriel) |[dszymczuk](https://github.com/dszymczuk) |[dmurat](https://github.com/dmurat) |[peah90](https://github.com/peah90) |[dstockhammer](https://github.com/dstockhammer) |

[<img alt="dwido" src="https://avatars.githubusercontent.com/u/154235?v=3&s=117" width="117">](https://github.com/dwido) |[<img alt="dcsw" src="https://avatars.githubusercontent.com/u/5479057?v=3&s=117" width="117">](https://github.com/dcsw) |[<img alt="totev" src="https://avatars.githubusercontent.com/u/4454638?v=3&s=117" width="117">](https://github.com/totev) |[<img alt="nosachamos" src="https://avatars.githubusercontent.com/u/1261686?v=3&s=117" width="117">](https://github.com/nosachamos) |[<img alt="ericli1018" src="https://avatars.githubusercontent.com/u/8234413?v=3&s=117" width="117">](https://github.com/ericli1018) |[<img alt="koodikindral" src="https://avatars.githubusercontent.com/u/6285484?v=3&s=117" width="117">](https://github.com/koodikindral) |
:---: |:---: |:---: |:---: |:---: |:---: |
[dwido](https://github.com/dwido) |[dcsw](https://github.com/dcsw) |[totev](https://github.com/totev) |[nosachamos](https://github.com/nosachamos) |[ericli1018](https://github.com/ericli1018) |[koodikindral](https://github.com/koodikindral) |

[<img alt="amaltsev" src="https://avatars.githubusercontent.com/u/2480962?v=3&s=117" width="117">](https://github.com/amaltsev) |[<img alt="Falinor" src="https://avatars.githubusercontent.com/u/9626158?v=3&s=117" width="117">](https://github.com/Falinor) |[<img alt="hpinsley" src="https://avatars.githubusercontent.com/u/750098?v=3&s=117" width="117">](https://github.com/hpinsley) |[<img alt="NN77" src="https://avatars.githubusercontent.com/u/3319904?v=3&s=117" width="117">](https://github.com/NN77) |[<img alt="isidroamv" src="https://avatars.githubusercontent.com/u/4197621?v=3&s=117" width="117">](https://github.com/isidroamv) |[<img alt="jeffbcross" src="https://avatars.githubusercontent.com/u/463703?v=3&s=117" width="117">](https://github.com/jeffbcross) |
:---: |:---: |:---: |:---: |:---: |:---: |
[amaltsev](https://github.com/amaltsev) |[Falinor](https://github.com/Falinor) |[hpinsley](https://github.com/hpinsley) |[NN77](https://github.com/NN77) |[isidroamv](https://github.com/isidroamv) |[jeffbcross](https://github.com/jeffbcross) |

[<img alt="isidroamv" src="https://avatars.githubusercontent.com/u/4197621?v=3&s=117" width="117">](https://github.com/isidroamv) |[<img alt="jeffbcross" src="https://avatars.githubusercontent.com/u/463703?v=3&s=117" width="117">](https://github.com/jeffbcross) |[<img alt="Jimmysh" src="https://avatars.githubusercontent.com/u/230652?v=3&s=117" width="117">](https://github.com/Jimmysh) |[<img alt="Drane" src="https://avatars.githubusercontent.com/u/389499?v=3&s=117" width="117">](https://github.com/Drane) |[<img alt="johnjelinek" src="https://avatars.githubusercontent.com/u/873610?v=3&s=117" width="117">](https://github.com/johnjelinek) |[<img alt="fourctv" src="https://avatars.githubusercontent.com/u/15777910?v=3&s=117" width="117">](https://github.com/fourctv) |
:---: |:---: |:---: |:---: |:---: |:---: |
[isidroamv](https://github.com/isidroamv) |[jeffbcross](https://github.com/jeffbcross) |[Jimmysh](https://github.com/Jimmysh) |[Drane](https://github.com/Drane) |[johnjelinek](https://github.com/johnjelinek) |[fourctv](https://github.com/fourctv) |

[<img alt="JunusErgin" src="https://avatars.githubusercontent.com/u/7281463?v=3&s=117" width="117">](https://github.com/JunusErgin) |[<img alt="justindujardin" src="https://avatars.githubusercontent.com/u/101493?v=3&s=117" width="117">](https://github.com/justindujardin) |[<img alt="lihaibh" src="https://avatars.githubusercontent.com/u/4681233?v=3&s=117" width="117">](https://github.com/lihaibh) |[<img alt="Brooooooklyn" src="https://avatars.githubusercontent.com/u/3468483?v=3&s=117" width="117">](https://github.com/Brooooooklyn) |[<img alt="tandu" src="https://avatars.githubusercontent.com/u/273313?v=3&s=117" width="117">](https://github.com/tandu) |[<img alt="inkidotcom" src="https://avatars.githubusercontent.com/u/100466?v=3&s=117" width="117">](https://github.com/inkidotcom) |
:---: |:---: |:---: |:---: |:---: |:---: |
[JunusErgin](https://github.com/JunusErgin) |[justindujardin](https://github.com/justindujardin) |[lihaibh](https://github.com/lihaibh) |[Brooooooklyn](https://github.com/Brooooooklyn) |[tandu](https://github.com/tandu) |[inkidotcom](https://github.com/inkidotcom) |

[<img alt="daixtrose" src="https://avatars.githubusercontent.com/u/5588692?v=3&s=117" width="117">](https://github.com/daixtrose) |[<img alt="mjwwit" src="https://avatars.githubusercontent.com/u/4455124?v=3&s=117" width="117">](https://github.com/mjwwit) |[<img alt="oferze" src="https://avatars.githubusercontent.com/u/5157769?v=3&s=117" width="117">](https://github.com/oferze) |[<img alt="ocombe" src="https://avatars.githubusercontent.com/u/265378?v=3&s=117" width="117">](https://github.com/ocombe) |[<img alt="gdi2290" src="https://avatars.githubusercontent.com/u/1016365?v=3&s=117" width="117">](https://github.com/gdi2290) |[<img alt="typekpb" src="https://avatars.githubusercontent.com/u/499820?v=3&s=117" width="117">](https://github.com/typekpb) |
:---: |:---: |:---: |:---: |:---: |:---: |
[daixtrose](https://github.com/daixtrose) |[mjwwit](https://github.com/mjwwit) |[oferze](https://github.com/oferze) |[ocombe](https://github.com/ocombe) |[gdi2290](https://github.com/gdi2290) |[typekpb](https://github.com/typekpb) |

[<img alt="philipooo" src="https://avatars.githubusercontent.com/u/1702399?v=3&s=117" width="117">](https://github.com/philipooo) |[<img alt="pidupuis" src="https://avatars.githubusercontent.com/u/2828353?v=3&s=117" width="117">](https://github.com/pidupuis) |[<img alt="redian" src="https://avatars.githubusercontent.com/u/816941?v=3&s=117" width="117">](https://github.com/redian) |[<img alt="robertpenner" src="https://avatars.githubusercontent.com/u/79827?v=3&s=117" width="117">](https://github.com/robertpenner) |[<img alt="Sjiep" src="https://avatars.githubusercontent.com/u/5003111?v=3&s=117" width="117">](https://github.com/Sjiep) |[<img alt="RoxKilly" src="https://avatars.githubusercontent.com/u/12346501?v=3&s=117" width="117">](https://github.com/RoxKilly) |
:---: |:---: |:---: |:---: |:---: |:---: |
[philipooo](https://github.com/philipooo) |[pidupuis](https://github.com/pidupuis) |[redian](https://github.com/redian) |[robertpenner](https://github.com/robertpenner) |[Sjiep](https://github.com/Sjiep) |[RoxKilly](https://github.com/RoxKilly) |

[<img alt="sclausen" src="https://avatars.githubusercontent.com/u/916076?v=3&s=117" width="117">](https://github.com/sclausen) |[<img alt="heavymery" src="https://avatars.githubusercontent.com/u/3417123?v=3&s=117" width="117">](https://github.com/heavymery) |[<img alt="tjvantoll" src="https://avatars.githubusercontent.com/u/544280?v=3&s=117" width="117">](https://github.com/tjvantoll) |[<img alt="tapas4java" src="https://avatars.githubusercontent.com/u/2254963?v=3&s=117" width="117">](https://github.com/tapas4java) |[<img alt="gitter-badger" src="https://avatars.githubusercontent.com/u/8518239?v=3&s=117" width="117">](https://github.com/gitter-badger) |[<img alt="valera-rozuvan" src="https://avatars.githubusercontent.com/u/2273090?v=3&s=117" width="117">](https://github.com/valera-rozuvan) |
:---: |:---: |:---: |:---: |:---: |:---: |
[sclausen](https://github.com/sclausen) |[heavymery](https://github.com/heavymery) |[tjvantoll](https://github.com/tjvantoll) |[tapas4java](https://github.com/tapas4java) |[gitter-badger](https://github.com/gitter-badger) |[valera-rozuvan](https://github.com/valera-rozuvan) |

[<img alt="vincentpalita" src="https://avatars.githubusercontent.com/u/2738822?v=3&s=117" width="117">](https://github.com/vincentpalita) |[<img alt="Yalrafih" src="https://avatars.githubusercontent.com/u/7460011?v=3&s=117" width="117">](https://github.com/Yalrafih) |[<img alt="arnaudvalle" src="https://avatars.githubusercontent.com/u/1215056?v=3&s=117" width="117">](https://github.com/arnaudvalle) |[<img alt="billsworld" src="https://avatars.githubusercontent.com/u/16911647?v=3&s=117" width="117">](https://github.com/billsworld) |[<img alt="blackheart01" src="https://avatars.githubusercontent.com/u/1414277?v=3&s=117" width="117">](https://github.com/blackheart01) |[<img alt="butterfieldcons" src="https://avatars.githubusercontent.com/u/12204784?v=3&s=117" width="117">](https://github.com/butterfieldcons) |
:---: |:---: |:---: |:---: |:---: |:---: |
[vincentpalita](https://github.com/vincentpalita) |[Yalrafih](https://github.com/Yalrafih) |[arnaudvalle](https://github.com/arnaudvalle) |[billsworld](https://github.com/billsworld) |[blackheart01](https://github.com/blackheart01) |[butterfieldcons](https://github.com/butterfieldcons) |

[<img alt="danielcrisp" src="https://avatars.githubusercontent.com/u/1104814?v=3&s=117" width="117">](https://github.com/danielcrisp) |[<img alt="jgolla" src="https://avatars.githubusercontent.com/u/1542447?v=3&s=117" width="117">](https://github.com/jgolla) |[<img alt="omerfarukyilmaz" src="https://avatars.githubusercontent.com/u/5538485?v=3&s=117" width="117">](https://github.com/omerfarukyilmaz) |[<img alt="pbazurin-softheme" src="https://avatars.githubusercontent.com/u/4518922?v=3&s=117" width="117">](https://github.com/pbazurin-softheme) |[<img alt="rossedfort" src="https://avatars.githubusercontent.com/u/11775628?v=3&s=117" width="117">](https://github.com/rossedfort) |[<img alt="savcha" src="https://avatars.githubusercontent.com/u/879542?v=3&s=117" width="117">](https://github.com/savcha) |
:---: |:---: |:---: |:---: |:---: |:---: |
[danielcrisp](https://github.com/danielcrisp) |[jgolla](https://github.com/jgolla) |[omerfarukyilmaz](https://github.com/omerfarukyilmaz) |[pbazurin-softheme](https://github.com/pbazurin-softheme) |[rossedfort](https://github.com/rossedfort) |[savcha](https://github.com/savcha) |

[<img alt="sebfag" src="https://avatars.githubusercontent.com/u/6400825?v=3&s=117" width="117">](https://github.com/sebfag) |[<img alt="ultrasonicsoft" src="https://avatars.githubusercontent.com/u/4145169?v=3&s=117" width="117">](https://github.com/ultrasonicsoft) |[<img alt="urmaul" src="https://avatars.githubusercontent.com/u/1838544?v=3&s=117" width="117">](https://github.com/urmaul) |
:---: |:---: |:---: |
[sebfag](https://github.com/sebfag) |[ultrasonicsoft](https://github.com/ultrasonicsoft) |[urmaul](https://github.com/urmaul) |

## License

MIT