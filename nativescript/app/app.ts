// import 'reflect-metadata';
// import 'rxjs/add/operator/map';

// nativescript
import { NativeScriptModule, platformNativeScriptDynamic, onAfterLivesync, onBeforeLivesync } from "nativescript-angular/platform";
import { NativeScriptRouterModule, NS_ROUTER_DIRECTIVES } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

// angular
import { NgModule } from "@angular/core";

// libs
import {TranslateLoader} from 'ng2-translate/ng2-translate';
import {TNSTranslateLoader} from 'nativescript-ng2-translate/nativescript-ng2-translate';

// config
import {Config, WindowService} from './app/frameworks/core/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;
Config.DEBUG.LEVEL_4 = true;
Config.ROUTER_DIRECTIVES = NS_ROUTER_DIRECTIVES;

// app
import {NS_APP_PROVIDERS} from './shared/nativescript/index';
import {routes} from './app/components/app/app.routes';
import {NSAppComponent} from './pages/app/app.component';
import {WindowNative} from './shared/core/index';

// Uncomment when ready to publish to App Stores:
// enableProdMode();

@NgModule({
  declarations: [],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule
  ],
  exports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule
  ],
  providers: [
    { provide: WindowService, useClass: WindowNative },
    {
      provide: TranslateLoader, useFactory: () => {
        return new TNSTranslateLoader('assets/i18n');
      }
    },
    NS_APP_PROVIDERS
  ]
})
class AppModule { }

function makeExampleModule(componentType) {
    let imports: any[] = [AppModule];
    if (componentType.routes) {
        imports.push(NativeScriptRouterModule.forRoot(componentType.routes))
    }
    let entries = [];
    if (componentType.entries) {
        entries = componentType.entries;
    }
    entries.push(componentType);
    let providers = [];
    if (componentType.providers) {
        providers = componentType.providers
    }
    @NgModule({
        bootstrap: [componentType],
        imports: imports,
        entryComponents: entries,
        declarations: entries,
        providers: providers,
    })
    class ExampleModuleForComponent {}

    return ExampleModuleForComponent;
}

platformNativeScriptDynamic().bootstrapModule(makeExampleModule(NSAppComponent));
