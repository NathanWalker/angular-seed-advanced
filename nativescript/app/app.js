// var application = require('application');
// application.mainModule = 'main.mobile.native';
// application.cssFile = 'assets/main.css';
// application.start();
// nativescript
var application_1 = require('nativescript-angular/application');
var router_1 = require('nativescript-angular/router');
require('reflect-metadata');
require('rxjs/add/operator/map');
// angular
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var router_2 = require('angular2/router');
// 3rd party dependencies
var ng2_translate_1 = require('ng2-translate/ng2-translate');
// config
var app_config_1 = require('./frameworks/app.framework/core/services/app-config');
app_config_1.AppConfig.PLATFORM_TARGET = app_config_1.AppConfig.PLATFORMS.MOBILE_NATIVE;
app_config_1.AppConfig.DEBUG.LEVEL_4 = true;
app_config_1.AppConfig.ROUTER_DIRECTIVES = router_1.NS_ROUTER_DIRECTIVES;
// app
var ns_location_strategy_1 = require('./frameworks/mobile.framework/native/routing/ns-location-strategy');
var window_1 = require('./frameworks/app.framework/core/services/window');
var console_1 = require('./frameworks/app.framework/core/services/console');
var _providers_1 = require('./frameworks/app.framework/_providers');
var multilingual_1 = require('./frameworks/app.framework/i18n/services/multilingual');
var app_1 = require('./components/app/app');
var WindowNative = (function () {
    function WindowNative() {
    }
    Object.defineProperty(WindowNative.prototype, "navigator", {
        get: function () {
            return {
                language: 'en-US'
            };
        },
        enumerable: true,
        configurable: true
    });
    return WindowNative;
})();
// export function loaded(args: EventData) {
//   let page = <any>args.object;
//   NativeScriptAppConfig.PAGE = page;
// if (page.ios) {
//   let navigationBar = topmost().ios.controller.navigationBar;
//   navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
// }
application_1.nativeScriptBootstrap(app_1.AppCmp, [
    core_1.provide(window_1.Window, { useClass: WindowNative }),
    core_1.provide(console_1.Console, { useValue: console }),
    http_1.HTTP_PROVIDERS,
    router_1.NS_ROUTER_PROVIDERS,
    core_1.provide(router_2.LocationStrategy, { useClass: ns_location_strategy_1.NSLocationStrategy }),
    _providers_1.APP_PROVIDERS,
    core_1.provide(multilingual_1.Multilingual, {
        useFactory: function (translate, win) {
            multilingual_1.Multilingual.SUPPORTED_LANGUAGES = app_config_1.AppConfig.SUPPORTED_LANGUAGES;
            return new multilingual_1.Multilingual(translate, win);
        },
        deps: [ng2_translate_1.TranslateService, window_1.Window]
    })
]);
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbIldpbmRvd05hdGl2ZSIsIldpbmRvd05hdGl2ZS5jb25zdHJ1Y3RvciIsIldpbmRvd05hdGl2ZS5uYXZpZ2F0b3IiXSwibWFwcGluZ3MiOiJBQUFBLDRDQUE0QztBQUM1QyxpREFBaUQ7QUFDakQsMkNBQTJDO0FBQzNDLHVCQUF1QjtBQUV2QixlQUFlO0FBQ2YsNEJBQW9DLGtDQUFrQyxDQUFDLENBQUE7QUFDdkUsdUJBQXdELDZCQUE2QixDQUFDLENBQUE7QUFJdEYsUUFBTyxrQkFBa0IsQ0FBQyxDQUFBO0FBQzFCLFFBQU8sdUJBQXVCLENBQUMsQ0FBQTtBQUUvQixVQUFVO0FBQ1YscUJBQXNCLGVBQWUsQ0FBQyxDQUFBO0FBQ3RDLHFCQUE2QixlQUFlLENBQUMsQ0FBQTtBQUM3Qyx1QkFBK0IsaUJBQWlCLENBQUMsQ0FBQTtBQUVqRCx5QkFBeUI7QUFDekIsOEJBQStCLDZCQUE2QixDQUFDLENBQUE7QUFFN0QsU0FBUztBQUNULDJCQUF3QixxREFBcUQsQ0FBQyxDQUFBO0FBQzlFLHNCQUFTLENBQUMsZUFBZSxHQUFHLHNCQUFTLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztBQUM5RCxzQkFBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQy9CLHNCQUFTLENBQUMsaUJBQWlCLEdBQUcsNkJBQW9CLENBQUM7QUFFbkQsTUFBTTtBQUNOLHFDQUFpQyxtRUFBbUUsQ0FBQyxDQUFBO0FBRXJHLHVCQUFxQixpREFBaUQsQ0FBQyxDQUFBO0FBQ3ZFLHdCQUFzQixrREFBa0QsQ0FBQyxDQUFBO0FBQ3pFLDJCQUE0Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQ3BFLDZCQUEyQix1REFBdUQsQ0FBQyxDQUFBO0FBQ25GLG9CQUFxQixzQkFBc0IsQ0FBQyxDQUFBO0FBSTVDO0lBQUFBO0lBTUFDLENBQUNBO0lBTENELHNCQUFXQSxtQ0FBU0E7YUFBcEJBO1lBQ0VFLE1BQU1BLENBQUNBO2dCQUNMQSxRQUFRQSxFQUFFQSxPQUFPQTthQUNsQkEsQ0FBQ0E7UUFDSkEsQ0FBQ0E7OztPQUFBRjtJQUNIQSxtQkFBQ0E7QUFBREEsQ0FBQ0EsQUFORCxJQU1DO0FBRUQsNENBQTRDO0FBQzVDLGlDQUFpQztBQUNqQyx1Q0FBdUM7QUFFckMsa0JBQWtCO0FBQ2xCLGdFQUFnRTtBQUNoRSx5REFBeUQ7QUFDekQsSUFBSTtBQUVOLG1DQUFxQixDQUFDLFlBQU0sRUFBRTtJQUM1QixjQUFPLENBQUMsZUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFDO0lBQzNDLGNBQU8sQ0FBQyxpQkFBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3ZDLHFCQUFjO0lBQ2QsNEJBQW1CO0lBQ25CLGNBQU8sQ0FBQyx5QkFBZ0IsRUFBRSxFQUFFLFFBQVEsRUFBRSx5Q0FBa0IsRUFBRSxDQUFDO0lBQzNELDBCQUFhO0lBQ2IsY0FBTyxDQUFDLDJCQUFZLEVBQUU7UUFDcEIsVUFBVSxFQUFFLFVBQUMsU0FBUyxFQUFFLEdBQUc7WUFDekIsMkJBQVksQ0FBQyxtQkFBbUIsR0FBRyxzQkFBUyxDQUFDLG1CQUFtQixDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxJQUFJLDJCQUFZLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDRCxJQUFJLEVBQUUsQ0FBQyxnQ0FBZ0IsRUFBRSxlQUFNLENBQUM7S0FDakMsQ0FBQztDQUNILENBQUMsQ0FBQztBQUNILElBQUkifQ==