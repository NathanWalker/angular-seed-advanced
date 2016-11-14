// nativescript
import { NativeScriptModule, platformNativeScriptDynamic, onAfterLivesync, onBeforeLivesync } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router/router-extensions';
import { Http } from '@angular/http';

// angular
import { NgModule } from '@angular/core';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

// app
import { WindowService, ConsoleService, RouterExtensions } from './app/frameworks/core/index';
import { NSAppComponent } from './pages/app/app.component';
import { AboutComponent } from './app/components/about/about.component';
import { HomeComponent } from './app/components/home/home.component';
import { routes } from './app/components/app.routes';

// feature modules
import { CoreModule } from './app/frameworks/core/core.module';
import { AnalyticsModule } from './app/frameworks/analytics/analytics.module';
import { MultilingualModule, translateFactory } from './app/frameworks/i18n/multilingual.module';
import { multilingualReducer, MultilingualEffects } from './app/frameworks/i18n/index';
import { SampleModule } from './app/frameworks/sample/sample.module';
import { nameListReducer, NameListEffects } from './app/frameworks/sample/index';

// {N} custom app specific
import { WindowNative } from './shared/core/index';
import { NS_ANALYTICS_PROVIDERS } from './shared/nativescript/index';

// intermediate component module
// helps encapsulate custom native modules in with the components
// note: couple ways this could be done, just one option presented here...
@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    MultilingualModule.forRoot([{
      provide: TranslateLoader,
      deps: [Http],
      useFactory: (translateFactory)
    }]),
    SampleModule
  ],
  declarations: [
    HomeComponent,
    AboutComponent
  ],
  exports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    MultilingualModule,
    SampleModule
  ]
})
class ComponentsModule { }

// For AoT compilation to work:
export function cons() {
  return console;
}

@NgModule({
  imports: [
    CoreModule.forRoot([
      { provide: WindowService, useClass: WindowNative },
      { provide: ConsoleService, useFactory: (cons) }
    ]),
    AnalyticsModule,
    ComponentsModule,
    NativeScriptRouterModule.forRoot(<any>routes),
    StoreModule.provideStore({
      i18n: multilingualReducer,
      names: nameListReducer
    }),
    EffectsModule.run(MultilingualEffects),
    EffectsModule.run(NameListEffects)
  ],
  declarations: [
    NSAppComponent
  ],
  providers: [
    NS_ANALYTICS_PROVIDERS,
    { provide: RouterExtensions, useClass: TNSRouterExtensions }
  ],
  bootstrap: [NSAppComponent]
})

export class NativeModule { }
