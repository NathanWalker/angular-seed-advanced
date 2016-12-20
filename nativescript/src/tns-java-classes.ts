//Resolve JavaScript classes that extend a Java class, and need to resolve
//their JavaScript module from a bundled script. For example:
//NativeScriptApplication, NativeScriptActivity, etc.
//
//This module gets bundled together with the rest of the app code and the
//`require` calls get resolved to the correct bundling import call.
//
//At runtime the module gets loaded *before* the rest of the app code, so code
//placed here needs to be careful about its dependencies.

require("application");
require("ui/frame");
require("ui/frame/activity");

if (global.TNS_WEBPACK) {
    global.__requireOverride = function (name, dir) {
        if (name === "./tns_modules/application/application.js") {
            return require("application");
        } else if (name === "./tns_modules/ui/frame/frame.js") {
            return require("ui/frame");
        } else if (name === "./tns_modules/ui/frame/activity.js") {
            return require("ui/frame/activity");
        }
    };
}
