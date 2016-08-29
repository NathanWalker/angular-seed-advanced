// nativescript
import { NativeScriptModule, platformNativeScriptDynamic, onAfterLivesync, onBeforeLivesync } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule, NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS } from 'nativescript-angular/router';
import { RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router/router-extensions';
import { NS_HTTP_PROVIDERS } from 'nativescript-angular/http';

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

@NgModule({
  imports: [
    CoreModule.forRoot([
      { provide: WindowService, useClass: WindowNative },
      { provide: ConsoleService, useValue: console }
    ]),
    AnalyticsModule,
    MultilingualModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: () => new TNSTranslateLoader('assets/i18n')
    }),
    SampleModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  declarations: [
    NSAppComponent,
    // AboutComponent,
    // HomeComponent,
    NS_ROUTER_DIRECTIVES
  ],
  providers: [
    NS_ROUTER_PROVIDERS, // required atm (may be able to remove in future)
    NS_HTTP_PROVIDERS,
    NS_ANALYTICS_PROVIDERS,
    { provide: RouterExtensions, useClass: TNSRouterExtensions }
  ],
  bootstrap: [NSAppComponent]
})

export class NativeModule { }
