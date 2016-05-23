![Angular 2 Seed Advanced](https://d2wp4shknjcfjl.cloudfront.net/api/file/olEzxJQ2KcXrZHzbt9UA)![Angular 2 Seed Advanced Integrations](https://d2wp4shknjcfjl.cloudfront.net/api/file/SPLl77rSTuGZ7APrXizi)

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![Build Status](https://travis-ci.org/NathanWalker/angular2-seed-advanced.svg?branch=master)](https://travis-ci.org/NathanWalker/angular2-seed-advanced)
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
    - When using the seed, be sure to change your `write_key` [here](https://github.com/NathanWalker/angular2-seed-advanced/blob/master/src/client/index.html#L24)
  - Can be changed to any vendor, [learn more here](https://github.com/angulartics/angulartics2#supported-providers)
- [lodash](https://lodash.com/) Helps reduce blocks of code down to single lines and enhances readability
- [NativeScript](https://www.nativescript.org/) cross platform mobile (w/ native UI) apps. [Setup instructions here](#nativescript-app).
- [Electron](http://electron.atom.io/) cross platform desktop apps (Mac, Windows and Linux). [Setup instructions here](#electron-app).

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
- [Progressive Web Apps](#progressive-web-apps)
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
  - `analytics.framework`: analytics provided by [Segment](https://segment.com/)
    - Only reports data in **production** build
  - `i18n.framework`: internationalization features
  - `nativescript.framework`: [NativeScript](https://www.nativescript.org/) specific code
  - `electron.framework`: [Electron](http://electron.atom.io/) specific code
  - `test.framework`: test specific code providing conveniences to make testing your code easier and faster 

#### Enhanced testing support options
- mocks for various services
- configurable provider blocks for easy test setup of common application providers
  - tired of setting up similar providers over and over again for different tests?
  - configure a reusable test provider which can be configured on a case-by-base basis
  - see [example here](https://github.com/NathanWalker/angular2-seed-advanced/blob/master/src/client/app/frameworks/test.framework/providers/component.ts)
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
  - see [example here](https://github.com/NathanWalker/angular2-seed-advanced/blob/master/src/client/app/frameworks/test.framework/shorthand/ng2-jasmine.ts)
  - watch [video explanation **coming soon**](https://github.com/NathanWalker/angular2-seed-advanced)
  
**Advice**: If your project is intended to target a single platform (i.e, web only), then [angular2-seed](https://github.com/mgechev/angular2-seed) is likely more than suitable for your needs. However if your project goals are to target multiple platforms (web, native mobile and native desktop), with powerful out of the box library support and highly configurable/flexible testing options, then you might want to keep reading.

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
npm run serve.docs

# dev build
npm run build.dev
# prod build
npm run build.prod
```

## NativeScript App

#### Setup

```
npm install -g nativescript 
```

#### Dev Workflow

You can make changes to files in `src/client` or `nativescript` folders. A symbolic link exists between the web `src/client` and the `nativescript` folder so changes in either location are mirrored because they are the same directory inside.

Create `.tns.html` NativeScript view files for every web component view file you have. You will see an example of the `app.component.html` as a [NativeScript view file here](https://github.com/NathanWalker/angular2-seed-advanced/blob/master/src/client/app/components/app/app.component.tns.html).

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

1. Download a zip of the seed. (**Do not fork**)
2. `npm run setup` - This will initialize `git` as well as setup `upstream` properly.
3. `git remote add origin ...your private repo...`
4. `git add .; git commit -m'setup'` - To setup the first commit
5. `npm run merge` - This will fetch upstream and run the first merge (*Important)
  * IMPORTANT: You will see a wall of Conflicts after doing above. This is normal. There actually will not be any conflicts as it's just reporting every single file which both sides (`upstream` and your first commit) added.
6. `git add .; git commit -m'ready'`. Yes, you will be committing all those conflicts, which actually are not a problem in this 1 time case.
7. Now you have `git` setup and ready to develop your application as well as merge in upstream changes in the future.
8. Create a new `framework` for your application in `src/client/app/frameworks` to build your codebase out. Say your app is called `AwesomeApp`, then create `awesomeapp.framework` and start building out all your components and services in there. Create other frameworks as you see fit to organize.
9. If you don't want an integration that comes out of box with this seed; for example. let's say you don't want to use i18n. Then just delete the `i18n.framework`, remove `ng2-translate` as dependency root `package.json` and `nativescript/package.json`. Then remove any references to `i18n` throughout.

You can read more about [configuring a remote for a fork here](https://help.github.com/articles/configuring-a-remote-for-a-fork/)

#### Merging latest upstream changes

1. `npm run merge.preview` - This will fetch `upstream` and show you how the merge would look
2. `npm run merge` - This will actually do the merge
3. Handle any conflicts to get latest upstream into your application.
4. Continue building your app.

You can read more about [syncing a fork here](https://help.github.com/articles/syncing-a-fork/).

If you have any suggestions to this workflow, please post [here](https://github.com/NathanWalker/angular2-seed-advanced/issues).

## Contributing

Please see the [CONTRIBUTING](https://github.com/NathanWalker/angular2-seed-advanced/blob/master/CONTRIBUTING.md) file for guidelines.

# Awesome Contributors

[<img alt="mgechev" src="https://avatars.githubusercontent.com/u/455023?v=3&s=117" width="117">](https://github.com/mgechev) |[<img alt="ludohenin" src="https://avatars.githubusercontent.com/u/1011516?v=3&s=117" width="117">](https://github.com/ludohenin) |[<img alt="NathanWalker" src="https://avatars.githubusercontent.com/u/457187?v=3&s=117" width="117">](https://github.com/NathanWalker) |[<img alt="d3viant0ne" src="https://avatars.githubusercontent.com/u/8420490?v=3&s=117" width="117">](https://github.com/d3viant0ne) |[<img alt="tarlepp" src="https://avatars.githubusercontent.com/u/595561?v=3&s=117" width="117">](https://github.com/tarlepp) |[<img alt="nareshbhatia" src="https://avatars.githubusercontent.com/u/1220198?v=3&s=117" width="117">](https://github.com/nareshbhatia) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[ludohenin](https://github.com/ludohenin) |[NathanWalker](https://github.com/NathanWalker) |[d3viant0ne](https://github.com/d3viant0ne) |[tarlepp](https://github.com/tarlepp) |[nareshbhatia](https://github.com/nareshbhatia) |

[<img alt="jesperronn" src="https://avatars.githubusercontent.com/u/6267?v=3&s=117" width="117">](https://github.com/jesperronn) |[<img alt="Shyam-Chen" src="https://avatars.githubusercontent.com/u/13535256?v=3&s=117" width="117">](https://github.com/Shyam-Chen) |[<img alt="TheDonDope" src="https://avatars.githubusercontent.com/u/1188033?v=3&s=117" width="117">](https://github.com/TheDonDope) |[<img alt="aboeglin" src="https://avatars.githubusercontent.com/u/8297302?v=3&s=117" width="117">](https://github.com/aboeglin) |[<img alt="the-ult" src="https://avatars.githubusercontent.com/u/4863062?v=3&s=117" width="117">](https://github.com/the-ult) |[<img alt="JakePartusch" src="https://avatars.githubusercontent.com/u/6424140?v=3&s=117" width="117">](https://github.com/JakePartusch) |
:---: |:---: |:---: |:---: |:---: |:---: |
[jesperronn](https://github.com/jesperronn) |[Shyam-Chen](https://github.com/Shyam-Chen) |[TheDonDope](https://github.com/TheDonDope) |[aboeglin](https://github.com/aboeglin) |[the-ult](https://github.com/the-ult) |[JakePartusch](https://github.com/JakePartusch) |

[<img alt="gkalpak" src="https://avatars.githubusercontent.com/u/8604205?v=3&s=117" width="117">](https://github.com/gkalpak) |[<img alt="ryzy" src="https://avatars.githubusercontent.com/u/994940?v=3&s=117" width="117">](https://github.com/ryzy) |[<img alt="pgrzeszczak" src="https://avatars.githubusercontent.com/u/3300099?v=3&s=117" width="117">](https://github.com/pgrzeszczak) |[<img alt="natarajanmca11" src="https://avatars.githubusercontent.com/u/9244766?v=3&s=117" width="117">](https://github.com/natarajanmca11) |[<img alt="njs50" src="https://avatars.githubusercontent.com/u/55112?v=3&s=117" width="117">](https://github.com/njs50) |[<img alt="domfarolino" src="https://avatars.githubusercontent.com/u/9669289?v=3&s=117" width="117">](https://github.com/domfarolino) |
:---: |:---: |:---: |:---: |:---: |:---: |
[gkalpak](https://github.com/gkalpak) |[ryzy](https://github.com/ryzy) |[pgrzeszczak](https://github.com/pgrzeszczak) |[natarajanmca11](https://github.com/natarajanmca11) |[njs50](https://github.com/njs50) |[domfarolino](https://github.com/domfarolino) |

[<img alt="jerryorta-dev" src="https://avatars.githubusercontent.com/u/341155?v=3&s=117" width="117">](https://github.com/jerryorta-dev) |[<img alt="larsthorup" src="https://avatars.githubusercontent.com/u/1202959?v=3&s=117" width="117">](https://github.com/larsthorup) |[<img alt="LuxDie" src="https://avatars.githubusercontent.com/u/12536671?v=3&s=117" width="117">](https://github.com/LuxDie) |[<img alt="tsm91" src="https://avatars.githubusercontent.com/u/4459551?v=3&s=117" width="117">](https://github.com/tsm91) |[<img alt="e-oz" src="https://avatars.githubusercontent.com/u/526352?v=3&s=117" width="117">](https://github.com/e-oz) |[<img alt="JohnCashmore" src="https://avatars.githubusercontent.com/u/2050794?v=3&s=117" width="117">](https://github.com/JohnCashmore) |
:---: |:---: |:---: |:---: |:---: |:---: |
[jerryorta-dev](https://github.com/jerryorta-dev) |[larsthorup](https://github.com/larsthorup) |[LuxDie](https://github.com/LuxDie) |[tsm91](https://github.com/tsm91) |[e-oz](https://github.com/e-oz) |[JohnCashmore](https://github.com/JohnCashmore) |

[<img alt="ouq77" src="https://avatars.githubusercontent.com/u/1796191?v=3&s=117" width="117">](https://github.com/ouq77) |[<img alt="devanp92" src="https://avatars.githubusercontent.com/u/4533277?v=3&s=117" width="117">](https://github.com/devanp92) |[<img alt="hAWKdv" src="https://avatars.githubusercontent.com/u/4449497?v=3&s=117" width="117">](https://github.com/hAWKdv) |[<img alt="c-ice" src="https://avatars.githubusercontent.com/u/347238?v=3&s=117" width="117">](https://github.com/c-ice) |[<img alt="markharding" src="https://avatars.githubusercontent.com/u/851436?v=3&s=117" width="117">](https://github.com/markharding) |[<img alt="gotenxds" src="https://avatars.githubusercontent.com/u/3519520?v=3&s=117" width="117">](https://github.com/gotenxds) |
:---: |:---: |:---: |:---: |:---: |:---: |
[ouq77](https://github.com/ouq77) |[devanp92](https://github.com/devanp92) |[hAWKdv](https://github.com/hAWKdv) |[c-ice](https://github.com/c-ice) |[markharding](https://github.com/markharding) |[gotenxds](https://github.com/gotenxds) |

[<img alt="evanplaice" src="https://avatars.githubusercontent.com/u/303159?v=3&s=117" width="117">](https://github.com/evanplaice) |[<img alt="Nightapes" src="https://avatars.githubusercontent.com/u/15911153?v=3&s=117" width="117">](https://github.com/Nightapes) |[<img alt="TuiKiken" src="https://avatars.githubusercontent.com/u/959821?v=3&s=117" width="117">](https://github.com/TuiKiken) |[<img alt="juristr" src="https://avatars.githubusercontent.com/u/542458?v=3&s=117" width="117">](https://github.com/juristr) |[<img alt="ip512" src="https://avatars.githubusercontent.com/u/1699735?v=3&s=117" width="117">](https://github.com/ip512) |[<img alt="Yonet" src="https://avatars.githubusercontent.com/u/3523671?v=3&s=117" width="117">](https://github.com/Yonet) |
:---: |:---: |:---: |:---: |:---: |:---: |
[evanplaice](https://github.com/evanplaice) |[Nightapes](https://github.com/Nightapes) |[TuiKiken](https://github.com/TuiKiken) |[juristr](https://github.com/juristr) |[ip512](https://github.com/ip512) |[Yonet](https://github.com/Yonet) |

[<img alt="ojacquemart" src="https://avatars.githubusercontent.com/u/1189345?v=3&s=117" width="117">](https://github.com/ojacquemart) |[<img alt="mjwwit" src="https://avatars.githubusercontent.com/u/4455124?v=3&s=117" width="117">](https://github.com/mjwwit) |[<img alt="nulldev07" src="https://avatars.githubusercontent.com/u/2115712?v=3&s=117" width="117">](https://github.com/nulldev07) |[<img alt="allenhwkim" src="https://avatars.githubusercontent.com/u/1437734?v=3&s=117" width="117">](https://github.com/allenhwkim) |[<img alt="yassirh" src="https://avatars.githubusercontent.com/u/4649139?v=3&s=117" width="117">](https://github.com/yassirh) |[<img alt="brendanbenson" src="https://avatars.githubusercontent.com/u/866866?v=3&s=117" width="117">](https://github.com/brendanbenson) |
:---: |:---: |:---: |:---: |:---: |:---: |
[ojacquemart](https://github.com/ojacquemart) |[mjwwit](https://github.com/mjwwit) |[nulldev07](https://github.com/nulldev07) |[allenhwkim](https://github.com/allenhwkim) |[yassirh](https://github.com/yassirh) |[brendanbenson](https://github.com/brendanbenson) |

[<img alt="briantopping" src="https://avatars.githubusercontent.com/u/158115?v=3&s=117" width="117">](https://github.com/briantopping) |[<img alt="cadriel" src="https://avatars.githubusercontent.com/u/205520?v=3&s=117" width="117">](https://github.com/cadriel) |[<img alt="dszymczuk" src="https://avatars.githubusercontent.com/u/539352?v=3&s=117" width="117">](https://github.com/dszymczuk) |[<img alt="dstockhammer" src="https://avatars.githubusercontent.com/u/1156637?v=3&s=117" width="117">](https://github.com/dstockhammer) |[<img alt="dwido" src="https://avatars.githubusercontent.com/u/154235?v=3&s=117" width="117">](https://github.com/dwido) |[<img alt="totev" src="https://avatars.githubusercontent.com/u/4454638?v=3&s=117" width="117">](https://github.com/totev) |
:---: |:---: |:---: |:---: |:---: |:---: |
[briantopping](https://github.com/briantopping) |[cadriel](https://github.com/cadriel) |[dszymczuk](https://github.com/dszymczuk) |[dstockhammer](https://github.com/dstockhammer) |[dwido](https://github.com/dwido) |[totev](https://github.com/totev) |

[<img alt="koodikindral" src="https://avatars.githubusercontent.com/u/6285484?v=3&s=117" width="117">](https://github.com/koodikindral) |[<img alt="Green-Cat" src="https://avatars.githubusercontent.com/u/3328823?v=3&s=117" width="117">](https://github.com/Green-Cat) |[<img alt="alexweber" src="https://avatars.githubusercontent.com/u/14409?v=3&s=117" width="117">](https://github.com/alexweber) |[<img alt="hpinsley" src="https://avatars.githubusercontent.com/u/750098?v=3&s=117" width="117">](https://github.com/hpinsley) |[<img alt="jeffbcross" src="https://avatars.githubusercontent.com/u/463703?v=3&s=117" width="117">](https://github.com/jeffbcross) |[<img alt="Jimmysh" src="https://avatars.githubusercontent.com/u/230652?v=3&s=117" width="117">](https://github.com/Jimmysh) |
:---: |:---: |:---: |:---: |:---: |:---: |
[koodikindral](https://github.com/koodikindral) |[Green-Cat](https://github.com/Green-Cat) |[alexweber](https://github.com/alexweber) |[hpinsley](https://github.com/hpinsley) |[jeffbcross](https://github.com/jeffbcross) |[Jimmysh](https://github.com/Jimmysh) |

[<img alt="johnjelinek" src="https://avatars.githubusercontent.com/u/873610?v=3&s=117" width="117">](https://github.com/johnjelinek) |[<img alt="justindujardin" src="https://avatars.githubusercontent.com/u/101493?v=3&s=117" width="117">](https://github.com/justindujardin) |[<img alt="lihaibh" src="https://avatars.githubusercontent.com/u/4681233?v=3&s=117" width="117">](https://github.com/lihaibh) |[<img alt="Brooooooklyn" src="https://avatars.githubusercontent.com/u/3468483?v=3&s=117" width="117">](https://github.com/Brooooooklyn) |[<img alt="tandu" src="https://avatars.githubusercontent.com/u/273313?v=3&s=117" width="117">](https://github.com/tandu) |[<img alt="inkidotcom" src="https://avatars.githubusercontent.com/u/100466?v=3&s=117" width="117">](https://github.com/inkidotcom) |
:---: |:---: |:---: |:---: |:---: |:---: |
[johnjelinek](https://github.com/johnjelinek) |[justindujardin](https://github.com/justindujardin) |[lihaibh](https://github.com/lihaibh) |[Brooooooklyn](https://github.com/Brooooooklyn) |[tandu](https://github.com/tandu) |[inkidotcom](https://github.com/inkidotcom) |

[<img alt="amaltsev" src="https://avatars.githubusercontent.com/u/2480962?v=3&s=117" width="117">](https://github.com/amaltsev) |[<img alt="ocombe" src="https://avatars.githubusercontent.com/u/265378?v=3&s=117" width="117">](https://github.com/ocombe) |[<img alt="gdi2290" src="https://avatars.githubusercontent.com/u/1016365?v=3&s=117" width="117">](https://github.com/gdi2290) |[<img alt="typekpb" src="https://avatars.githubusercontent.com/u/499820?v=3&s=117" width="117">](https://github.com/typekpb) |[<img alt="philipooo" src="https://avatars.githubusercontent.com/u/1702399?v=3&s=117" width="117">](https://github.com/philipooo) |[<img alt="pidupuis" src="https://avatars.githubusercontent.com/u/2828353?v=3&s=117" width="117">](https://github.com/pidupuis) |
:---: |:---: |:---: |:---: |:---: |:---: |
[amaltsev](https://github.com/amaltsev) |[ocombe](https://github.com/ocombe) |[gdi2290](https://github.com/gdi2290) |[typekpb](https://github.com/typekpb) |[philipooo](https://github.com/philipooo) |[pidupuis](https://github.com/pidupuis) |

[<img alt="redian" src="https://avatars.githubusercontent.com/u/816941?v=3&s=117" width="117">](https://github.com/redian) |[<img alt="Bigous" src="https://avatars.githubusercontent.com/u/6886560?v=3&s=117" width="117">](https://github.com/Bigous) |[<img alt="robbatt" src="https://avatars.githubusercontent.com/u/1379424?v=3&s=117" width="117">](https://github.com/robbatt) |[<img alt="robertpenner" src="https://avatars.githubusercontent.com/u/79827?v=3&s=117" width="117">](https://github.com/robertpenner) |[<img alt="sclausen" src="https://avatars.githubusercontent.com/u/916076?v=3&s=117" width="117">](https://github.com/sclausen) |[<img alt="heavymery" src="https://avatars.githubusercontent.com/u/3417123?v=3&s=117" width="117">](https://github.com/heavymery) |
:---: |:---: |:---: |:---: |:---: |:---: |
[redian](https://github.com/redian) |[Bigous](https://github.com/Bigous) |[robbatt](https://github.com/robbatt) |[robertpenner](https://github.com/robertpenner) |[sclausen](https://github.com/sclausen) |[heavymery](https://github.com/heavymery) |

[<img alt="tapas4java" src="https://avatars.githubusercontent.com/u/2254963?v=3&s=117" width="117">](https://github.com/tapas4java) |[<img alt="gitter-badger" src="https://avatars.githubusercontent.com/u/8518239?v=3&s=117" width="117">](https://github.com/gitter-badger) |[<img alt="blackheart01" src="https://avatars.githubusercontent.com/u/1414277?v=3&s=117" width="117">](https://github.com/blackheart01) |[<img alt="butterfieldcons" src="https://avatars.githubusercontent.com/u/12204784?v=3&s=117" width="117">](https://github.com/butterfieldcons) |[<img alt="divramod" src="https://avatars.githubusercontent.com/u/1331662?v=3&s=117" width="117">](https://github.com/divramod) |[<img alt="jgolla" src="https://avatars.githubusercontent.com/u/1542447?v=3&s=117" width="117">](https://github.com/jgolla) |
:---: |:---: |:---: |:---: |:---: |:---: |
[tapas4java](https://github.com/tapas4java) |[gitter-badger](https://github.com/gitter-badger) |[blackheart01](https://github.com/blackheart01) |[butterfieldcons](https://github.com/butterfieldcons) |[divramod](https://github.com/divramod) |[jgolla](https://github.com/jgolla) |

[<img alt="sebfag" src="https://avatars.githubusercontent.com/u/6400825?v=3&s=117" width="117">](https://github.com/sebfag) |[<img alt="ultrasonicsoft" src="https://avatars.githubusercontent.com/u/4145169?v=3&s=117" width="117">](https://github.com/ultrasonicsoft) |[<img alt="sonicparke" src="https://avatars.githubusercontent.com/u/1139721?v=3&s=117" width="117">](https://github.com/sonicparke) |
:---: |:---: |:---: |
[sebfag](https://github.com/sebfag) |[ultrasonicsoft](https://github.com/ultrasonicsoft) |[sonicparke](https://github.com/sonicparke) |


## License

MIT
