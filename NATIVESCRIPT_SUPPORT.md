# Experimental NativeScript support

### Setup

```
git clone https://github.com/NathanWalker/angular2-seed-advanced.git
cd angular2-seed-advanced
cd src  // we set things up from `src` directory for the {N} integration as it does not use the seed build
npm install
```

#### Fix `typings` issues with `tns-core-modules`

All instructions below will assume you are in the `src` folder (as mentioned above) so paths are relative to `src` directory:

Open `node_modules/tns-core-modules/tns-core-modules.d.ts`. Copy the following and paste to replace, then save:

```
/// <reference path="application-settings/application-settings.d.ts" />
/// <reference path="application/application.d.ts" />
/// <reference path="camera/camera.d.ts" />
/// <reference path="color/color.d.ts" />
/// <reference path="color/known-colors.d.ts" />
/// <reference path="connectivity/connectivity.d.ts" />
/// <reference path="console/console.d.ts" />
/// <reference path="css-value/reworkcss-value.d.ts" />
/// <reference path="css/reworkcss.d.ts" />
/// <reference path="data/observable-array/observable-array.d.ts" />
/// <reference path="data/observable/observable.d.ts" />
/// <reference path="data/virtual-array/virtual-array.d.ts" />
/// <reference path="file-system/file-name-resolver.d.ts" />
/// <reference path="file-system/file-system-access.d.ts" />
/// <reference path="file-system/file-system.d.ts" />
/// <reference path="fps-meter/fps-meter.d.ts" />
/// <reference path="fps-meter/fps-native.d.ts" />
/// <reference path="http/http.d.ts" />
/// <reference path="image-source/image-source.d.ts" />
/// <reference path="js-libs/esprima/esprima.d.ts" />
/// <reference path="location/location.d.ts" />
/// <reference path="platform/platform.d.ts" />
/// <reference path="text/formatted-string.d.ts" />
/// <reference path="text/span.d.ts" />
/// <reference path="text/text.d.ts" />
/// <reference path="timer/timer.d.ts" />
/// <reference path="trace/trace.d.ts" />
/// <reference path="ui/action-bar/action-bar.d.ts" />
/// <reference path="ui/activity-indicator/activity-indicator.d.ts" />
/// <reference path="ui/animation/animation.d.ts" />
/// <reference path="ui/border/border.d.ts" />
/// <reference path="ui/builder/builder.d.ts" />
/// <reference path="ui/builder/component-builder.d.ts" />
/// <reference path="ui/builder/special-properties.d.ts" />
/// <reference path="ui/button/button.d.ts" />
/// <reference path="ui/content-view/content-view.d.ts" />
/// <reference path="ui/core/bindable.d.ts" />
/// <reference path="ui/core/control-state-change.d.ts" />
/// <reference path="ui/core/dependency-observable.d.ts" />
/// <reference path="ui/core/proxy.d.ts" />
/// <reference path="ui/core/view.d.ts" />
/// <reference path="ui/core/weak-event-listener.d.ts" />
/// <reference path="ui/date-picker/date-picker.d.ts" />
/// <reference path="ui/dialogs/dialogs.d.ts" />
/// <reference path="ui/editable-text-base/editable-text-base.d.ts" />
/// <reference path="ui/enums/enums.d.ts" />
/// <reference path="ui/frame/frame.d.ts" />
/// <reference path="ui/gestures/gestures.d.ts" />
/// <reference path="ui/html-view/html-view.d.ts" />
/// <reference path="ui/image-cache/image-cache.d.ts" />
/// <reference path="ui/image/image.d.ts" />
/// <reference path="ui/label/label.d.ts" />
/// <reference path="ui/layouts/absolute-layout/absolute-layout.d.ts" />
/// <reference path="ui/layouts/dock-layout/dock-layout.d.ts" />
/// <reference path="ui/layouts/grid-layout/grid-layout.d.ts" />
/// <reference path="ui/layouts/layout-base.d.ts" />
/// <reference path="ui/layouts/layout.d.ts" />
/// <reference path="ui/layouts/stack-layout/stack-layout.d.ts" />
/// <reference path="ui/layouts/wrap-layout/wrap-layout.d.ts" />
/// <reference path="ui/list-picker/list-picker.d.ts" />
/// <reference path="ui/list-view/list-view.d.ts" />
/// <reference path="ui/page/page.d.ts" />
/// <reference path="ui/placeholder/placeholder.d.ts" />
/// <reference path="ui/progress/progress.d.ts" />
/// <reference path="ui/proxy-view-container/proxy-view-container.d.ts" />
/// <reference path="ui/repeater/repeater.d.ts" />
/// <reference path="ui/scroll-view/scroll-view.d.ts" />
/// <reference path="ui/search-bar/search-bar.d.ts" />
/// <reference path="ui/segmented-bar/segmented-bar.d.ts" />
/// <reference path="ui/slider/slider.d.ts" />
/// <reference path="ui/styling/background.d.ts" />
/// <reference path="ui/styling/css-selector.d.ts" />
/// <reference path="ui/styling/font.d.ts" />
/// <reference path="ui/styling/style-property.d.ts" />
/// <reference path="ui/styling/styling.d.ts" />
/// <reference path="ui/styling/visual-state-constants.d.ts" />
/// <reference path="ui/switch/switch.d.ts" />
/// <reference path="ui/tab-view/tab-view.d.ts" />
/// <reference path="ui/text-base/text-base-styler.d.ts" />
/// <reference path="ui/text-base/text-base.d.ts" />
/// <reference path="ui/text-field/text-field.d.ts" />
/// <reference path="ui/text-view/text-view.d.ts" />
/// <reference path="ui/time-picker/time-picker.d.ts" />
/// <reference path="ui/ui.d.ts" />
/// <reference path="ui/utils.d.ts" />
/// <reference path="ui/web-view/web-view.d.ts" />
/// <reference path="utils/debug.d.ts" />
/// <reference path="utils/types.d.ts" />
/// <reference path="utils/utils.d.ts" />
/// <reference path="xml/xml.d.ts" />
```

This removes all the typing references that are already handled by the `"../typings/main.d.ts"` reference in `src/tsconfig.json`.

#### Platform add

```
tns platform add ios
```

#### Start app

```
npm start
```

You should get this error:
```
file:///app/tns_modules/ng2-translate/src/translate.service.js:34:19: JS ERROR ReferenceError: Can't find variable: __metadata
```

Not sure if this is something wrong with `ng2-translate` or if there is something I'm missing with {N} integration with 3rd party npm libraries?

`ng2-translate` also installs with a `bundles` directory which contains a file built with systemjs bundler. Not sure if I need to use that one instead and if so, how would I use that with {N} setup. Not sure if that's the issue or not though.




