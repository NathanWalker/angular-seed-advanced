![Angular Seed Advanced](https://d2wp4shknjcfjl.cloudfront.net/api/file/olEzxJQ2KcXrZHzbt9UA)![Angular Seed Advanced Integrations](https://d2wp4shknjcfjl.cloudfront.net/api/file/SPLl77rSTuGZ7APrXizi)

[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![Build Status](https://travis-ci.org/NathanWalker/angular-seed-advanced.svg?branch=master)](https://travis-ci.org/NathanWalker/angular-seed-advanced)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/NathanWalker/angular-seed-advanced.svg)](https://david-dm.org/NathanWalker/angular-seed-advanced)
[![devDependency Status](https://david-dm.org/NathanWalker/angular-seed-advanced/dev-status.svg)](https://david-dm.org/NathanWalker/angular-seed-advanced#info=devDependencies)

This is an **advanced** seed project for Angular apps based on [Minko Gechev's](https://github.com/mgechev) [angular-seed](https://github.com/mgechev/angular-seed) that expands on all of its great features to include core support for:

#### Integration with:
- [ngrx/store](https://github.com/ngrx/store) RxJS powered state management, inspired by **Redux**
- [ngrx/effects](https://github.com/ngrx/effects) Side effect model for @ngrx/store
- [ng2-translate](https://github.com/ocombe/ng2-translate) for i18n 
  - Usage is optional but on by default
  - Up to you and your team how you want to utilize it. It can be easily removed if not needed. 
- [angulartics2](https://github.com/angulartics/angulartics2) Vendor-agnostic analytics for Angular applications.
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

- [Prerequisites](#prerequisites)
- [How to start](#how-to-start)
- [How to start with AoT](#how-to-start-with-aot)
- [Mobile app](#mobile-app)
- [Desktop app](#desktop-app)
- [Running tests](#running-tests)
- [Web configuration options](#web-configuration-options)
- [Code organization overview](#code-organization-overview)
- [How-tos](#how-tos)
- [General best practice guide to sharing code](#general-best-practice-guide-to-sharing-code)
- [Integration guides](https://github.com/NathanWalker/angular-seed-advanced/wiki)
- [How best to use for your project](#how-best-to-use-for-your-project)
- [Dockerization](#dockerization)
  + [How to build and start the dockerized version of the application](#how-to-build-and-start-the-dockerized-version-of-the-application)
  + [Development build and deployment](#development-build-and-deployment)
  + [Production build and deployment](#production-build-and-deployment)
- [Contributing](#contributing)
- [License](#license)
  
**Advice**: If your project is intended to target a single platform (i.e, web only), then [angular-seed](https://github.com/mgechev/angular-seed) is likely more than suitable for your needs. However if your project goals are to target multiple platforms (web, native mobile and native desktop), with powerful out of the box library support and highly configurable/flexible testing options, then you might want to keep reading.

### Prerequisites

**Note** you should have **node v6.5.0 or higher** and **npm 3.10.3 or higher**.

* To run the NativeScript app:

```
npm install -g nativescript
npm install -g typescript
```

## How to start

```bash
# install the project's dependencies
$ npm install
# fast install (via Yarn, https://yarnpkg.com)
$ yarn install  # or yarn

# watches your files and uses livereload by default
$ npm start
# api document for the app
# npm run build.docs

# generate api documentation
$ npm run compodoc
$ npm run serve.compodoc

# to start deving with livereload site and coverage as well as continuous testing
$ npm run start.deving

# dev build
$ npm run build.dev
# prod build
$ npm run build.prod
```

## How to start with AoT

**Note** that AoT compilation requires **node v6.5.0 or higher** and **npm 3.10.3 or higher**.

In order to start the seed with AoT use:

```bash
# prod build with AoT compilation, will output the production application in `dist/prod`
# the produced code can be deployed (rsynced) to a remote server
$ npm run build.prod.aot
```

## Mobile app

The mobile app is provided via [NativeScript](https://www.nativescript.org/), an open source framework for building truly native mobile apps.

#### Setup

```
npm install -g nativescript 
```

#### Dev Workflow

You can make changes to files in `src/client/app` or `nativescript/src/app` folders. A symbolic link exists between the web `src/client/app` and the `nativescript/src/app` folder so changes in either location are mirrored because they are the same directory inside.

Create `.tns.html` and `.tns.scss` NativeScript view files for every web component view file you have. You will see an example of the `app.component.html` as a [NativeScript view file here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/app/components/app.component.tns.html).

The root module for the mobile app is `nativescript/src/native.module.ts`: `NativeModule`. 

#### Run

```
iOS:                      npm run start.ios   
iOS (device):             npm run start.ios.device

// or...

Android:                      npm run start.android
Android (device):             npm run start.android.device
```

* Requires an image setup via AVD Manager. [Learn more here](http://developer.android.com/intl/zh-tw/tools/devices/managing-avds.html) and [here](https://github.com/NativeScript/nativescript-cli#the-commands).

OR...

* [GenyMotion Android Emulator](https://www.genymotion.com/)

##### Building with Webpack for release builds

Create AoT builds for deployment to App Store and Google Play.

```
Android:   npm run build.android
iOS:       npm run build.ios
```

## Desktop app

The desktop app is provided via [Electron](http://electron.atom.io/), cross platform desktop apps
with JavaScript, HTML, and CSS.

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

## Web configuration options

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

## Code organization overview

- `nativescript`: Root of this directory is reserved for mobile app.
  - `src`: mobile app src.
    - `app`: Symbolic link of shared code from web app.
    - `App_Resources`: iOS and Android platform specific config files and images.
    - `mobile`: Mobile specific services, etc. Build out mobile specific services here as well as overrides for web services that need to be provided for in the mobile app. **Safe to import {N} modules here.**
    - [native.module.ts](https://github.com/NathanWalker/angular-seed-advanced/blob/master/nativescript/src/native.module.ts): Root module for the mobile app provided by NativeScript. Override/provide native mobile implementations of services here.
- `src/client`: Root of this directory is reserved for web and desktop.
  - `app`: All the code in this directory is shared with the mobile app via a symbolic link.
    - `components`: Reserved for primary routing components. Since each app usually has it's own set of unique routes, you can provide the app's primary routing components here.
    - `shared`: Shared code across all platforms. Reusable sub components, services, utilities, etc.
      - `analytics`: Provides services for analytics. Out of the box, [Segment](https://segment.com/) is configured.
      - `core`: Low level services. Foundational layer.
      - `electron`: Services specific to electron integration. Could be refactored out in the future since this is not needed to be shared with the mobile app.
      - `i18n`: Various localization features.
      - `ngrx`: Central ngrx coordination. Brings together state from any other feature modules etc. to setup the initial app state.
      - `sample`: Just a sample module pre-configured with a scalable ngrx setup.
      - `test`: Testing utilities. This could be refactored into a different location in the future.
  - `assets`: Various locale files, images and other assets the app needs to load.
  - `css`: List of the main style files to be created via the SASS compilation (enabled by default).
  - `scss`: Partial SASS files - reserved for things like `_variables.scss` and other imported partials for styling.
  - [index.html](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/index.html): The index file for the web and desktop app (which share the same setup).
  - [main.desktop.ts](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/main.desktop.ts): The  file used by Electron to start the desktop app.
  - [main.web.prod.ts](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/main.web.prod.ts): Bootstraps the AoT web build. *Generally won't modify anything here*
  - [main.web.ts](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/main.web.ts): Bootstraps the development web build. *Generally won't modify anything here*
  - [package.json](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/package.json): Used by Electron to start the desktop app.
  - [system-config.ts](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/system-config.ts): This loads the SystemJS configuration defined [here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/tools/config/seed.config.ts#L397) and extended in your own app's customized [project.config.ts](https://github.com/NathanWalker/angular-seed-advanced/blob/master/tools/config/project.config.ts).
  - [tsconfig.json](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/tsconfig.json): Used by [compodoc](https://compodoc.github.io/compodoc/) - The missing documentation tool for your Angular application - to generate api docs for your code.
  - [web.module.ts](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/web.module.ts): The root module for the web and desktop app.
- `src/e2e`: Integration/end-to-end tests for the web app.

## How-tos

### i18n

* how to add a language?
  - `src/client/assets/i18n/`
    - add `[language code].json` (copy existing one and adapt the translation strings)
  - Create a file similar to the [sample app-config](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/app/shared/sample/services/app-config.ts)
    - Define your app's `SUPPORTED_LANGUAGES`.
  - `src/client/app/shared/i18n/components/lang-switcher.component.spec.ts`
    - fix test

## General best practice guide to sharing code

There’s actually only a few things to keep in mind when sharing code between web/mobile. The seed does take care of quite a few of those things but here’s a brief list:

* Don’t import {N} modules into your components/services. {N} modules can only be used inside the {N} app therefore cannot be shared. To get around this, use `OpaqueTokens` which is a fancy name for something quite simple. [Learn more here](http://blog.thoughtram.io/angular/2016/05/23/opaque-tokens-in-angular-2.html). A great example of how to integrate 2 different plugins (1 for web, 1 for {N}) and share all the code exists in [this wiki article: How to integrate Firebase across all platforms](https://github.com/NathanWalker/angular-seed-advanced/wiki/How-to-integrate-Firebase-across-all-platforms-(web-nativescript-desktop)) written by the awesome [Scott Lowe](https://twitter.com/scott_d_lowe).
* Use the conditional hooks provided by the seed in shared methods where you may need to handle something differently in {N} than you do on the web. For example, see [here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/app/shared/i18n/components/lang-switcher.component.ts#L35-L41).
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

## How best to use for your project

#### Setup

*NOTE*: This should be done first before you start making any changes and building out your project.

1. `git clone https://github.com/NathanWalker/angular-seed-advanced.git [your-project-name]`
2. `cd [your-project-name]`
3. `git remote set-url origin [your-project-git-repo]` - This will setup `origin` properly.
4. `git remote add upstream https://github.com/NathanWalker/angular-seed-advanced.git` - This will setup `upstream` properly to merge in upstream changes later.
5. `git push` - Go ahead and push up the initial project.
6. Now you have `git` setup and ready to develop your app as well as merge in upstream changes in the future.
7. `npm install` (and all other usage docs in this `README` apply) - continue following instructions [here](https://github.com/NathanWalker/angular-seed-advanced#how-to-start).
8. Create a new folder (or several sub-folders) for your app in `src/client/app/shared` to build your codebase out. Say your app is called `AwesomeApp`, then create `awesomeapp` and start building out all your components and services in there. Create other frameworks as you see fit to organize.

#### Merging latest upstream changes

1. `git fetch upstream` - This will fetch latest `upstream`.
2. `git merge upstream/master` - This will merge in upstream changes.
3. Handle any conflicts to get latest upstream into your app.
4. Continue building your app.

You can read more about [syncing a fork here](https://help.github.com/articles/syncing-a-fork/).

If you have any suggestions to this workflow, please post [here](https://github.com/NathanWalker/angular-seed-advanced/issues).

# Dockerization

The application provides full Docker support. You can use it for both development as well as production builds and deployments.

## How to build and start the dockerized version of the application 

The Dockerization infrastructure is described in the `docker-compose.yml` (respectively `docker-compose.production.yml`.
The application consists of two containers:
- `angular-seed` - In development mode, this container serves the angular app. In production mode it builds the angular app, with the build artifacts being served by the Nginx container
- `angular-seed-nginx` - This container is used only production mode. It serves the built angular app with Nginx.

## Development build and deployment

Run the following:

```bash
$ docker-compose build
$ docker-compose up -d
```

Now open your browser at http://localhost:5555

## Production build and deployment

Run the following:

```bash
$ docker-compose -f docker-compose.production.yml build
$ docker-compose -f docker-compose.production.yml up angular-seed   # Wait until this container has finished building, as the nginx container is dependent on the production build artifacts
$ docker-compose -f docker-compose.production.yml up -d angular-seed-nginx  # Start the nginx container in detached mode
```

Now open your browser at http://localhost:5555

## Contributing

Please see the [CONTRIBUTING](https://github.com/NathanWalker/angular-seed-advanced/blob/master/CONTRIBUTING.md) file for guidelines.

# Awesome Contributors

[<img alt="mgechev" src="https://avatars.githubusercontent.com/u/455023?v=3&s=117" width="117">](https://github.com/mgechev) |[<img alt="NathanWalker" src="https://avatars.githubusercontent.com/u/457187?v=3&s=117" width="117">](https://github.com/NathanWalker) |[<img alt="ludohenin" src="https://avatars.githubusercontent.com/u/1011516?v=3&s=117" width="117">](https://github.com/ludohenin) |[<img alt="d3viant0ne" src="https://avatars.githubusercontent.com/u/8420490?v=3&s=117" width="117">](https://github.com/d3viant0ne) |[<img alt="Shyam-Chen" src="https://avatars.githubusercontent.com/u/13535256?v=3&s=117" width="117">](https://github.com/Shyam-Chen) |[<img alt="Nightapes" src="https://avatars.githubusercontent.com/u/15911153?v=3&s=117" width="117">](https://github.com/Nightapes) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[NathanWalker](https://github.com/NathanWalker) |[ludohenin](https://github.com/ludohenin) |[d3viant0ne](https://github.com/d3viant0ne) |[Shyam-Chen](https://github.com/Shyam-Chen) |[Nightapes](https://github.com/Nightapes) |

[<img alt="tarlepp" src="https://avatars.githubusercontent.com/u/595561?v=3&s=117" width="117">](https://github.com/tarlepp) |[<img alt="TheDonDope" src="https://avatars.githubusercontent.com/u/1188033?v=3&s=117" width="117">](https://github.com/TheDonDope) |[<img alt="robstoll" src="https://avatars.githubusercontent.com/u/5557885?v=3&s=117" width="117">](https://github.com/robstoll) |[<img alt="m-abs" src="https://avatars.githubusercontent.com/u/1348705?v=3&s=117" width="117">](https://github.com/m-abs) |[<img alt="hank-ehly" src="https://avatars.githubusercontent.com/u/11639738?v=3&s=117" width="117">](https://github.com/hank-ehly) |[<img alt="nareshbhatia" src="https://avatars.githubusercontent.com/u/1220198?v=3&s=117" width="117">](https://github.com/nareshbhatia) |
:---: |:---: |:---: |:---: |:---: |:---: |
[tarlepp](https://github.com/tarlepp) |[TheDonDope](https://github.com/TheDonDope) |[robstoll](https://github.com/robstoll) |[m-abs](https://github.com/m-abs) |[hank-ehly](https://github.com/hank-ehly) |[nareshbhatia](https://github.com/nareshbhatia) |

[<img alt="kiuka" src="https://avatars.githubusercontent.com/u/11283191?v=3&s=117" width="117">](https://github.com/kiuka) |[<img alt="jesperronn" src="https://avatars.githubusercontent.com/u/6267?v=3&s=117" width="117">](https://github.com/jesperronn) |[<img alt="daniru" src="https://avatars.githubusercontent.com/u/2070853?v=3&s=117" width="117">](https://github.com/daniru) |[<img alt="njs50" src="https://avatars.githubusercontent.com/u/55112?v=3&s=117" width="117">](https://github.com/njs50) |[<img alt="vyakymenko" src="https://avatars.githubusercontent.com/u/7300673?v=3&s=117" width="117">](https://github.com/vyakymenko) |[<img alt="aboeglin" src="https://avatars.githubusercontent.com/u/8297302?v=3&s=117" width="117">](https://github.com/aboeglin) |
:---: |:---: |:---: |:---: |:---: |:---: |
[kiuka](https://github.com/kiuka) |[jesperronn](https://github.com/jesperronn) |[daniru](https://github.com/daniru) |[njs50](https://github.com/njs50) |[vyakymenko](https://github.com/vyakymenko) |[aboeglin](https://github.com/aboeglin) |

[<img alt="netstart" src="https://avatars.githubusercontent.com/u/200232?v=3&s=117" width="117">](https://github.com/netstart) |[<img alt="sasikumardr" src="https://avatars.githubusercontent.com/u/1760104?v=3&s=117" width="117">](https://github.com/sasikumardr) |[<img alt="eppsilon" src="https://avatars.githubusercontent.com/u/5643?v=3&s=117" width="117">](https://github.com/eppsilon) |[<img alt="gkalpak" src="https://avatars.githubusercontent.com/u/8604205?v=3&s=117" width="117">](https://github.com/gkalpak) |[<img alt="JakePartusch" src="https://avatars.githubusercontent.com/u/6424140?v=3&s=117" width="117">](https://github.com/JakePartusch) |[<img alt="ryzy" src="https://avatars.githubusercontent.com/u/994940?v=3&s=117" width="117">](https://github.com/ryzy) |
:---: |:---: |:---: |:---: |:---: |:---: |
[netstart](https://github.com/netstart) |[sasikumardr](https://github.com/sasikumardr) |[eppsilon](https://github.com/eppsilon) |[gkalpak](https://github.com/gkalpak) |[JakePartusch](https://github.com/JakePartusch) |[ryzy](https://github.com/ryzy) |

[<img alt="markwhitfeld" src="https://avatars.githubusercontent.com/u/1948265?v=3&s=117" width="117">](https://github.com/markwhitfeld) |[<img alt="jvitor83" src="https://avatars.githubusercontent.com/u/3493339?v=3&s=117" width="117">](https://github.com/jvitor83) |[<img alt="ivannugo" src="https://avatars.githubusercontent.com/u/8823899?v=3&s=117" width="117">](https://github.com/ivannugo) |[<img alt="sfabriece" src="https://avatars.githubusercontent.com/u/3108592?v=3&s=117" width="117">](https://github.com/sfabriece) |[<img alt="natarajanmca11" src="https://avatars.githubusercontent.com/u/9244766?v=3&s=117" width="117">](https://github.com/natarajanmca11) |[<img alt="e-oz" src="https://avatars.githubusercontent.com/u/526352?v=3&s=117" width="117">](https://github.com/e-oz) |
:---: |:---: |:---: |:---: |:---: |:---: |
[markwhitfeld](https://github.com/markwhitfeld) |[jvitor83](https://github.com/jvitor83) |[ivannugo](https://github.com/ivannugo) |[sfabriece](https://github.com/sfabriece) |[natarajanmca11](https://github.com/natarajanmca11) |[e-oz](https://github.com/e-oz) |

[<img alt="pgrzeszczak" src="https://avatars.githubusercontent.com/u/3300099?v=3&s=117" width="117">](https://github.com/pgrzeszczak) |[<img alt="jerryorta-dev" src="https://avatars.githubusercontent.com/u/341155?v=3&s=117" width="117">](https://github.com/jerryorta-dev) |[<img alt="LuxDie" src="https://avatars.githubusercontent.com/u/12536671?v=3&s=117" width="117">](https://github.com/LuxDie) |[<img alt="JayKan" src="https://avatars.githubusercontent.com/u/1400300?v=3&s=117" width="117">](https://github.com/JayKan) |[<img alt="JohnCashmore" src="https://avatars.githubusercontent.com/u/2050794?v=3&s=117" width="117">](https://github.com/JohnCashmore) |[<img alt="fulls1z3" src="https://avatars.githubusercontent.com/u/19705684?v=3&s=117" width="117">](https://github.com/fulls1z3) |
:---: |:---: |:---: |:---: |:---: |:---: |
[pgrzeszczak](https://github.com/pgrzeszczak) |[jerryorta-dev](https://github.com/jerryorta-dev) |[LuxDie](https://github.com/LuxDie) |[JayKan](https://github.com/JayKan) |[JohnCashmore](https://github.com/JohnCashmore) |[fulls1z3](https://github.com/fulls1z3) |

[<img alt="ouq77" src="https://avatars.githubusercontent.com/u/1796191?v=3&s=117" width="117">](https://github.com/ouq77) |[<img alt="irsick" src="https://avatars.githubusercontent.com/u/1380457?v=3&s=117" width="117">](https://github.com/irsick) |[<img alt="StefanKoenen" src="https://avatars.githubusercontent.com/u/1442819?v=3&s=117" width="117">](https://github.com/StefanKoenen) |[<img alt="amedinavalencia" src="https://avatars.githubusercontent.com/u/21317797?v=3&s=117" width="117">](https://github.com/amedinavalencia) |[<img alt="troyanskiy" src="https://avatars.githubusercontent.com/u/1538862?v=3&s=117" width="117">](https://github.com/troyanskiy) |[<img alt="tsm91" src="https://avatars.githubusercontent.com/u/4459551?v=3&s=117" width="117">](https://github.com/tsm91) |
:---: |:---: |:---: |:---: |:---: |:---: |
[ouq77](https://github.com/ouq77) |[irsick](https://github.com/irsick) |[StefanKoenen](https://github.com/StefanKoenen) |[amedinavalencia](https://github.com/amedinavalencia) |[troyanskiy](https://github.com/troyanskiy) |[tsm91](https://github.com/tsm91) |

[<img alt="domfarolino" src="https://avatars.githubusercontent.com/u/9669289?v=3&s=117" width="117">](https://github.com/domfarolino) |[<img alt="juristr" src="https://avatars.githubusercontent.com/u/542458?v=3&s=117" width="117">](https://github.com/juristr) |[<img alt="larsthorup" src="https://avatars.githubusercontent.com/u/1202959?v=3&s=117" width="117">](https://github.com/larsthorup) |[<img alt="turbohappy" src="https://avatars.githubusercontent.com/u/437299?v=3&s=117" width="117">](https://github.com/turbohappy) |[<img alt="devanp92" src="https://avatars.githubusercontent.com/u/4533277?v=3&s=117" width="117">](https://github.com/devanp92) |[<img alt="evanplaice" src="https://avatars.githubusercontent.com/u/303159?v=3&s=117" width="117">](https://github.com/evanplaice) |
:---: |:---: |:---: |:---: |:---: |:---: |
[domfarolino](https://github.com/domfarolino) |[juristr](https://github.com/juristr) |[larsthorup](https://github.com/larsthorup) |[turbohappy](https://github.com/turbohappy) |[devanp92](https://github.com/devanp92) |[evanplaice](https://github.com/evanplaice) |

[<img alt="hAWKdv" src="https://avatars.githubusercontent.com/u/4449497?v=3&s=117" width="117">](https://github.com/hAWKdv) |[<img alt="Kaffiend" src="https://avatars.githubusercontent.com/u/7826229?v=3&s=117" width="117">](https://github.com/Kaffiend) |[<img alt="JunaidZA" src="https://avatars.githubusercontent.com/u/16782593?v=3&s=117" width="117">](https://github.com/JunaidZA) |[<img alt="c-ice" src="https://avatars.githubusercontent.com/u/347238?v=3&s=117" width="117">](https://github.com/c-ice) |[<img alt="markharding" src="https://avatars.githubusercontent.com/u/851436?v=3&s=117" width="117">](https://github.com/markharding) |[<img alt="ojacquemart" src="https://avatars.githubusercontent.com/u/1189345?v=3&s=117" width="117">](https://github.com/ojacquemart) |
:---: |:---: |:---: |:---: |:---: |:---: |
[hAWKdv](https://github.com/hAWKdv) |[Kaffiend](https://github.com/Kaffiend) |[JunaidZA](https://github.com/JunaidZA) |[c-ice](https://github.com/c-ice) |[markharding](https://github.com/markharding) |[ojacquemart](https://github.com/ojacquemart) |

[<img alt="Sn3b" src="https://avatars.githubusercontent.com/u/1598065?v=3&s=117" width="117">](https://github.com/Sn3b) |[<img alt="TuiKiken" src="https://avatars.githubusercontent.com/u/959821?v=3&s=117" width="117">](https://github.com/TuiKiken) |[<img alt="gotenxds" src="https://avatars.githubusercontent.com/u/3519520?v=3&s=117" width="117">](https://github.com/gotenxds) |[<img alt="edud69" src="https://avatars.githubusercontent.com/u/1514745?v=3&s=117" width="117">](https://github.com/edud69) |[<img alt="karlhaas" src="https://avatars.githubusercontent.com/u/7677394?v=3&s=117" width="117">](https://github.com/karlhaas) |[<img alt="kbrandwijk" src="https://avatars.githubusercontent.com/u/852069?v=3&s=117" width="117">](https://github.com/kbrandwijk) |
:---: |:---: |:---: |:---: |:---: |:---: |
[Sn3b](https://github.com/Sn3b) |[TuiKiken](https://github.com/TuiKiken) |[gotenxds](https://github.com/gotenxds) |[edud69](https://github.com/edud69) |[karlhaas](https://github.com/karlhaas) |[kbrandwijk](https://github.com/kbrandwijk) |

[<img alt="Yonet" src="https://avatars.githubusercontent.com/u/3523671?v=3&s=117" width="117">](https://github.com/Yonet) |[<img alt="Green-Cat" src="https://avatars.githubusercontent.com/u/3328823?v=3&s=117" width="117">](https://github.com/Green-Cat) |[<img alt="ip512" src="https://avatars.githubusercontent.com/u/1699735?v=3&s=117" width="117">](https://github.com/ip512) |[<img alt="joshboley" src="https://avatars.githubusercontent.com/u/5840836?v=3&s=117" width="117">](https://github.com/joshboley) |[<img alt="Marcelh29" src="https://avatars.githubusercontent.com/u/3284645?v=3&s=117" width="117">](https://github.com/Marcelh29) |[<img alt="Bigous" src="https://avatars.githubusercontent.com/u/6886560?v=3&s=117" width="117">](https://github.com/Bigous) |
:---: |:---: |:---: |:---: |:---: |:---: |
[Yonet](https://github.com/Yonet) |[Green-Cat](https://github.com/Green-Cat) |[ip512](https://github.com/ip512) |[joshboley](https://github.com/joshboley) |[Marcelh29](https://github.com/Marcelh29) |[Bigous](https://github.com/Bigous) |

[<img alt="robbatt" src="https://avatars.githubusercontent.com/u/1379424?v=3&s=117" width="117">](https://github.com/robbatt) |[<img alt="divramod" src="https://avatars.githubusercontent.com/u/1331662?v=3&s=117" width="117">](https://github.com/divramod) |[<img alt="admosity" src="https://avatars.githubusercontent.com/u/4655972?v=3&s=117" width="117">](https://github.com/admosity) |[<img alt="alexweber" src="https://avatars.githubusercontent.com/u/14409?v=3&s=117" width="117">](https://github.com/alexweber) |[<img alt="vakrilov" src="https://avatars.githubusercontent.com/u/4092076?v=3&s=117" width="117">](https://github.com/vakrilov) |[<img alt="allenhwkim" src="https://avatars.githubusercontent.com/u/1437734?v=3&s=117" width="117">](https://github.com/allenhwkim) |
:---: |:---: |:---: |:---: |:---: |:---: |
[robbatt](https://github.com/robbatt) |[divramod](https://github.com/divramod) |[admosity](https://github.com/admosity) |[alexweber](https://github.com/alexweber) |[vakrilov](https://github.com/vakrilov) |[allenhwkim](https://github.com/allenhwkim) |

[<img alt="Falinor" src="https://avatars.githubusercontent.com/u/9626158?v=3&s=117" width="117">](https://github.com/Falinor) |[<img alt="amaltsev" src="https://avatars.githubusercontent.com/u/2480962?v=3&s=117" width="117">](https://github.com/amaltsev) |[<img alt="nulldev07" src="https://avatars.githubusercontent.com/u/2115712?v=3&s=117" width="117">](https://github.com/nulldev07) |[<img alt="taguan" src="https://avatars.githubusercontent.com/u/1026937?v=3&s=117" width="117">](https://github.com/taguan) |[<img alt="yassirh" src="https://avatars.githubusercontent.com/u/4649139?v=3&s=117" width="117">](https://github.com/yassirh) |[<img alt="urmaul" src="https://avatars.githubusercontent.com/u/1838544?v=3&s=117" width="117">](https://github.com/urmaul) |
:---: |:---: |:---: |:---: |:---: |:---: |
[Falinor](https://github.com/Falinor) |[amaltsev](https://github.com/amaltsev) |[nulldev07](https://github.com/nulldev07) |[taguan](https://github.com/taguan) |[yassirh](https://github.com/yassirh) |[urmaul](https://github.com/urmaul) |

[<img alt="sonicparke" src="https://avatars.githubusercontent.com/u/1139721?v=3&s=117" width="117">](https://github.com/sonicparke) |[<img alt="brendanbenson" src="https://avatars.githubusercontent.com/u/866866?v=3&s=117" width="117">](https://github.com/brendanbenson) |[<img alt="brian428" src="https://avatars.githubusercontent.com/u/140338?v=3&s=117" width="117">](https://github.com/brian428) |[<img alt="briantopping" src="https://avatars.githubusercontent.com/u/158115?v=3&s=117" width="117">](https://github.com/briantopping) |[<img alt="ckapilla" src="https://avatars.githubusercontent.com/u/451875?v=3&s=117" width="117">](https://github.com/ckapilla) |[<img alt="cadriel" src="https://avatars.githubusercontent.com/u/205520?v=3&s=117" width="117">](https://github.com/cadriel) |
:---: |:---: |:---: |:---: |:---: |:---: |
[sonicparke](https://github.com/sonicparke) |[brendanbenson](https://github.com/brendanbenson) |[brian428](https://github.com/brian428) |[briantopping](https://github.com/briantopping) |[ckapilla](https://github.com/ckapilla) |[cadriel](https://github.com/cadriel) |

[<img alt="dszymczuk" src="https://avatars.githubusercontent.com/u/539352?v=3&s=117" width="117">](https://github.com/dszymczuk) |[<img alt="dmurat" src="https://avatars.githubusercontent.com/u/470930?v=3&s=117" width="117">](https://github.com/dmurat) |[<img alt="peah90" src="https://avatars.githubusercontent.com/u/4435255?v=3&s=117" width="117">](https://github.com/peah90) |[<img alt="dstockhammer" src="https://avatars.githubusercontent.com/u/1156637?v=3&s=117" width="117">](https://github.com/dstockhammer) |[<img alt="dwido" src="https://avatars.githubusercontent.com/u/154235?v=3&s=117" width="117">](https://github.com/dwido) |[<img alt="dcsw" src="https://avatars.githubusercontent.com/u/5479057?v=3&s=117" width="117">](https://github.com/dcsw) |
:---: |:---: |:---: |:---: |:---: |:---: |
[dszymczuk](https://github.com/dszymczuk) |[dmurat](https://github.com/dmurat) |[peah90](https://github.com/peah90) |[dstockhammer](https://github.com/dstockhammer) |[dwido](https://github.com/dwido) |[dcsw](https://github.com/dcsw) |

[<img alt="totev" src="https://avatars.githubusercontent.com/u/4454638?v=3&s=117" width="117">](https://github.com/totev) |[<img alt="nosachamos" src="https://avatars.githubusercontent.com/u/1261686?v=3&s=117" width="117">](https://github.com/nosachamos) |[<img alt="ericli1018" src="https://avatars.githubusercontent.com/u/8234413?v=3&s=117" width="117">](https://github.com/ericli1018) |[<img alt="Swiftwork" src="https://avatars.githubusercontent.com/u/455178?v=3&s=117" width="117">](https://github.com/Swiftwork) |[<img alt="fbascheper" src="https://avatars.githubusercontent.com/u/430938?v=3&s=117" width="117">](https://github.com/fbascheper) |[<img alt="gsamokovarov" src="https://avatars.githubusercontent.com/u/604618?v=3&s=117" width="117">](https://github.com/gsamokovarov) |
:---: |:---: |:---: |:---: |:---: |:---: |
[totev](https://github.com/totev) |[nosachamos](https://github.com/nosachamos) |[ericli1018](https://github.com/ericli1018) |[Swiftwork](https://github.com/Swiftwork) |[fbascheper](https://github.com/fbascheper) |[gsamokovarov](https://github.com/gsamokovarov) |

[<img alt="koodikindral" src="https://avatars.githubusercontent.com/u/6285484?v=3&s=117" width="117">](https://github.com/koodikindral) |[<img alt="hpinsley" src="https://avatars.githubusercontent.com/u/750098?v=3&s=117" width="117">](https://github.com/hpinsley) |[<img alt="NN77" src="https://avatars.githubusercontent.com/u/3319904?v=3&s=117" width="117">](https://github.com/NN77) |[<img alt="isidroamv" src="https://avatars.githubusercontent.com/u/4197621?v=3&s=117" width="117">](https://github.com/isidroamv) |[<img alt="JohnnyQQQQ" src="https://avatars.githubusercontent.com/u/3528218?v=3&s=117" width="117">](https://github.com/JohnnyQQQQ) |[<img alt="jeffbcross" src="https://avatars.githubusercontent.com/u/463703?v=3&s=117" width="117">](https://github.com/jeffbcross) |
:---: |:---: |:---: |:---: |:---: |:---: |
[koodikindral](https://github.com/koodikindral) |[hpinsley](https://github.com/hpinsley) |[NN77](https://github.com/NN77) |[isidroamv](https://github.com/isidroamv) |[JohnnyQQQQ](https://github.com/JohnnyQQQQ) |[jeffbcross](https://github.com/jeffbcross) |

[<img alt="jlooper" src="https://avatars.githubusercontent.com/u/1450004?v=3&s=117" width="117">](https://github.com/jlooper) |[<img alt="Jimmysh" src="https://avatars.githubusercontent.com/u/230652?v=3&s=117" width="117">](https://github.com/Jimmysh) |[<img alt="Drane" src="https://avatars.githubusercontent.com/u/389499?v=3&s=117" width="117">](https://github.com/Drane) |[<img alt="johnjelinek" src="https://avatars.githubusercontent.com/u/873610?v=3&s=117" width="117">](https://github.com/johnjelinek) |[<img alt="fourctv" src="https://avatars.githubusercontent.com/u/15777910?v=3&s=117" width="117">](https://github.com/fourctv) |[<img alt="JunusErgin" src="https://avatars.githubusercontent.com/u/7281463?v=3&s=117" width="117">](https://github.com/JunusErgin) |
:---: |:---: |:---: |:---: |:---: |:---: |
[jlooper](https://github.com/jlooper) |[Jimmysh](https://github.com/Jimmysh) |[Drane](https://github.com/Drane) |[johnjelinek](https://github.com/johnjelinek) |[fourctv](https://github.com/fourctv) |[JunusErgin](https://github.com/JunusErgin) |

[<img alt="justindujardin" src="https://avatars.githubusercontent.com/u/101493?v=3&s=117" width="117">](https://github.com/justindujardin) |[<img alt="lihaibh" src="https://avatars.githubusercontent.com/u/4681233?v=3&s=117" width="117">](https://github.com/lihaibh) |[<img alt="Brooooooklyn" src="https://avatars.githubusercontent.com/u/3468483?v=3&s=117" width="117">](https://github.com/Brooooooklyn) |[<img alt="tandu" src="https://avatars.githubusercontent.com/u/273313?v=3&s=117" width="117">](https://github.com/tandu) |[<img alt="inkidotcom" src="https://avatars.githubusercontent.com/u/100466?v=3&s=117" width="117">](https://github.com/inkidotcom) |[<img alt="daixtrose" src="https://avatars.githubusercontent.com/u/5588692?v=3&s=117" width="117">](https://github.com/daixtrose) |
:---: |:---: |:---: |:---: |:---: |:---: |
[justindujardin](https://github.com/justindujardin) |[lihaibh](https://github.com/lihaibh) |[Brooooooklyn](https://github.com/Brooooooklyn) |[tandu](https://github.com/tandu) |[inkidotcom](https://github.com/inkidotcom) |[daixtrose](https://github.com/daixtrose) |

[<img alt="MathijsHoogland" src="https://avatars.githubusercontent.com/u/7372934?v=3&s=117" width="117">](https://github.com/MathijsHoogland) |[<img alt="mjwwit" src="https://avatars.githubusercontent.com/u/4455124?v=3&s=117" width="117">](https://github.com/mjwwit) |[<img alt="oferze" src="https://avatars.githubusercontent.com/u/5157769?v=3&s=117" width="117">](https://github.com/oferze) |[<img alt="ocombe" src="https://avatars.githubusercontent.com/u/265378?v=3&s=117" width="117">](https://github.com/ocombe) |[<img alt="gdi2290" src="https://avatars.githubusercontent.com/u/1016365?v=3&s=117" width="117">](https://github.com/gdi2290) |[<img alt="typekpb" src="https://avatars.githubusercontent.com/u/499820?v=3&s=117" width="117">](https://github.com/typekpb) |
:---: |:---: |:---: |:---: |:---: |:---: |
[MathijsHoogland](https://github.com/MathijsHoogland) |[mjwwit](https://github.com/mjwwit) |[oferze](https://github.com/oferze) |[ocombe](https://github.com/ocombe) |[gdi2290](https://github.com/gdi2290) |[typekpb](https://github.com/typekpb) |

[<img alt="peter-norton" src="https://avatars.githubusercontent.com/u/5089611?v=3&s=117" width="117">](https://github.com/peter-norton) |[<img alt="philipooo" src="https://avatars.githubusercontent.com/u/1702399?v=3&s=117" width="117">](https://github.com/philipooo) |[<img alt="pidupuis" src="https://avatars.githubusercontent.com/u/2828353?v=3&s=117" width="117">](https://github.com/pidupuis) |[<img alt="redian" src="https://avatars.githubusercontent.com/u/816941?v=3&s=117" width="117">](https://github.com/redian) |[<img alt="robertpenner" src="https://avatars.githubusercontent.com/u/79827?v=3&s=117" width="117">](https://github.com/robertpenner) |[<img alt="Sjiep" src="https://avatars.githubusercontent.com/u/5003111?v=3&s=117" width="117">](https://github.com/Sjiep) |
:---: |:---: |:---: |:---: |:---: |:---: |
[peter-norton](https://github.com/peter-norton) |[philipooo](https://github.com/philipooo) |[pidupuis](https://github.com/pidupuis) |[redian](https://github.com/redian) |[robertpenner](https://github.com/robertpenner) |[Sjiep](https://github.com/Sjiep) |

[<img alt="RoxKilly" src="https://avatars.githubusercontent.com/u/12346501?v=3&s=117" width="117">](https://github.com/RoxKilly) |[<img alt="SamVerschueren" src="https://avatars.githubusercontent.com/u/1913805?v=3&s=117" width="117">](https://github.com/SamVerschueren) |[<img alt="sclausen" src="https://avatars.githubusercontent.com/u/916076?v=3&s=117" width="117">](https://github.com/sclausen) |[<img alt="heavymery" src="https://avatars.githubusercontent.com/u/3417123?v=3&s=117" width="117">](https://github.com/heavymery) |[<img alt="tjvantoll" src="https://avatars.githubusercontent.com/u/544280?v=3&s=117" width="117">](https://github.com/tjvantoll) |[<img alt="tapas4java" src="https://avatars.githubusercontent.com/u/2254963?v=3&s=117" width="117">](https://github.com/tapas4java) |
:---: |:---: |:---: |:---: |:---: |:---: |
[RoxKilly](https://github.com/RoxKilly) |[SamVerschueren](https://github.com/SamVerschueren) |[sclausen](https://github.com/sclausen) |[heavymery](https://github.com/heavymery) |[tjvantoll](https://github.com/tjvantoll) |[tapas4java](https://github.com/tapas4java) |

[<img alt="gitter-badger" src="https://avatars.githubusercontent.com/u/8518239?v=3&s=117" width="117">](https://github.com/gitter-badger) |[<img alt="valera-rozuvan" src="https://avatars.githubusercontent.com/u/2273090?v=3&s=117" width="117">](https://github.com/valera-rozuvan) |[<img alt="miltador" src="https://avatars.githubusercontent.com/u/17062283?v=3&s=117" width="117">](https://github.com/miltador) |[<img alt="vincentpalita" src="https://avatars.githubusercontent.com/u/2738822?v=3&s=117" width="117">](https://github.com/vincentpalita) |[<img alt="VladimirMakaev" src="https://avatars.githubusercontent.com/u/2001475?v=3&s=117" width="117">](https://github.com/VladimirMakaev) |[<img alt="Yalrafih" src="https://avatars.githubusercontent.com/u/7460011?v=3&s=117" width="117">](https://github.com/Yalrafih) |
:---: |:---: |:---: |:---: |:---: |:---: |
[gitter-badger](https://github.com/gitter-badger) |[valera-rozuvan](https://github.com/valera-rozuvan) |[miltador](https://github.com/miltador) |[vincentpalita](https://github.com/vincentpalita) |[VladimirMakaev](https://github.com/VladimirMakaev) |[Yalrafih](https://github.com/Yalrafih) |

[<img alt="arnaudvalle" src="https://avatars.githubusercontent.com/u/1215056?v=3&s=117" width="117">](https://github.com/arnaudvalle) |[<img alt="billsworld" src="https://avatars.githubusercontent.com/u/16911647?v=3&s=117" width="117">](https://github.com/billsworld) |[<img alt="blackheart01" src="https://avatars.githubusercontent.com/u/1414277?v=3&s=117" width="117">](https://github.com/blackheart01) |[<img alt="butterfieldcons" src="https://avatars.githubusercontent.com/u/12204784?v=3&s=117" width="117">](https://github.com/butterfieldcons) |[<img alt="danielcrisp" src="https://avatars.githubusercontent.com/u/1104814?v=3&s=117" width="117">](https://github.com/danielcrisp) |[<img alt="jgolla" src="https://avatars.githubusercontent.com/u/1542447?v=3&s=117" width="117">](https://github.com/jgolla) |
:---: |:---: |:---: |:---: |:---: |:---: |
[arnaudvalle](https://github.com/arnaudvalle) |[billsworld](https://github.com/billsworld) |[blackheart01](https://github.com/blackheart01) |[butterfieldcons](https://github.com/butterfieldcons) |[danielcrisp](https://github.com/danielcrisp) |[jgolla](https://github.com/jgolla) |

[<img alt="omerfarukyilmaz" src="https://avatars.githubusercontent.com/u/5538485?v=3&s=117" width="117">](https://github.com/omerfarukyilmaz) |[<img alt="pbazurin-softheme" src="https://avatars.githubusercontent.com/u/4518922?v=3&s=117" width="117">](https://github.com/pbazurin-softheme) |[<img alt="ZuSe" src="https://avatars.githubusercontent.com/u/522403?v=3&s=117" width="117">](https://github.com/ZuSe) |[<img alt="rossedfort" src="https://avatars.githubusercontent.com/u/11775628?v=3&s=117" width="117">](https://github.com/rossedfort) |[<img alt="ruffiem" src="https://avatars.githubusercontent.com/u/1785492?v=3&s=117" width="117">](https://github.com/ruffiem) |[<img alt="savcha" src="https://avatars.githubusercontent.com/u/879542?v=3&s=117" width="117">](https://github.com/savcha) |
:---: |:---: |:---: |:---: |:---: |:---: |
[omerfarukyilmaz](https://github.com/omerfarukyilmaz) |[pbazurin-softheme](https://github.com/pbazurin-softheme) |[ZuSe](https://github.com/ZuSe) |[rossedfort](https://github.com/rossedfort) |[ruffiem](https://github.com/ruffiem) |[savcha](https://github.com/savcha) |

[<img alt="s-f-a-g" src="https://avatars.githubusercontent.com/u/6400825?v=3&s=117" width="117">](https://github.com/s-f-a-g) |[<img alt="ultrasonicsoft" src="https://avatars.githubusercontent.com/u/4145169?v=3&s=117" width="117">](https://github.com/ultrasonicsoft) |[<img alt="bbarry" src="https://avatars.githubusercontent.com/u/84951?v=3&s=117" width="117">](https://github.com/bbarry) |
:---: |:---: |:---: |
[s-f-a-g](https://github.com/s-f-a-g) |[ultrasonicsoft](https://github.com/ultrasonicsoft) |[bbarry](https://github.com/bbarry) |

## License

MIT