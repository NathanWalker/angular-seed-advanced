// nativescript
import { NativeScriptModule, platformNativeScriptDynamic, onAfterLivesync, onBeforeLivesync } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router/router-extensions';

// angular
import { NgModule } from '@angular/core';

// libs
import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';
import { TNSTranslateLoader } from 'nativescript-ng2-translate/nativescript-ng2-translate';

// app
import { WindowService, ConsoleService, RouterExtensions } from './app/frameworks/core/index';
import { NSAppComponent } from './pages/app/app.component';
import { AboutComponent } from './app/components/about/about.component';
import { HomeComponent } from './app/components/home/home.component';
import { routes } from './app/components/app.routes';

// feature modules
import { CoreModule } from './app/frameworks/core/core.module';
import { AnalyticsModule } from './app/frameworks/analytics/analytics.module';
import { MultilingualModule } from './app/frameworks/i18n/multilingual.module';
import { SampleModule } from './app/frameworks/sample/sample.module';

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
    MultilingualModule,
    TranslateModule
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
    MultilingualModule
  ]
})
class ComponentModule { }

@NgModule({
  imports: [
    CoreModule.forRoot([
      { provide: WindowService, useClass: WindowNative },
      { provide: ConsoleService, useValue: console }
    ]),
    AnalyticsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: () => new TNSTranslateLoader('assets/i18n')
    }),
    SampleModule,
    ComponentModule,
    NativeScriptRouterModule.forRoot(routes)
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
