// nativescript
import { NativeScriptModule, platformNativeScriptDynamic, onAfterLivesync, onBeforeLivesync } from 'nativescript-angular/platform';
import { NativeScriptRouterModule, NS_ROUTER_DIRECTIVES } from 'nativescript-angular/router';
import { RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router/router-extensions';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// angular
import { NgModule } from '@angular/core';

// app
import { NSAppComponent } from './pages/app/app.component';
import { AboutComponent } from './app/components/about/about.component';
import { HomeComponent } from './app/components/home/home.component';
import { routes } from './app/components/app.routes';
import { WindowNative } from './shared/core/index';
import { NS_ANALYTICS_PROVIDERS } from './shared/nativescript/index';

// feature modules
import { CoreModule } from './app/frameworks/core/core.module';
import { AnalyticsModule } from './app/frameworks/analytics/analytics.module';
import { MultilingualModule } from './app/frameworks/i18n/multilingual.module';
import { SampleModule } from './app/frameworks/sample/sample.module';

// libs
import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';
import { TNSTranslateLoader } from 'nativescript-ng2-translate/nativescript-ng2-translate';

// config
import { Config, WindowService, RouterExtensions } from './app/frameworks/core/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;
Config.DEBUG.LEVEL_4 = true;
Config.ROUTER_DIRECTIVES = NS_ROUTER_DIRECTIVES;

// sample config (extra)
import { AppConfig } from './app/frameworks/sample/services/app-config';
import { MultilingualService } from './app/frameworks/i18n/services/multilingual.service';
// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfig.SUPPORTED_LANGUAGES;

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forRoot(routes),
    CoreModule.forRoot({ window: WindowNative, console }),
    AnalyticsModule,
    MultilingualModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: () => new TNSTranslateLoader('assets/i18n')
    }),
    SampleModule.forRoot()
  ],
  declarations: [
    AboutComponent,
    HomeComponent
  ],
  entryComponents: [
    AboutComponent,
    HomeComponent
  ],
  providers: [
    NS_ANALYTICS_PROVIDERS,
    { provide: RouterExtensions, useClass: TNSRouterExtensions }
  ],
  bootstrap: [NSAppComponent]
})

export class NativeModule { }
