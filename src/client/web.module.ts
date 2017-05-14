// angular
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Http } from '@angular/http';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader } from '@ngx-translate/core';

// app
import { APP_COMPONENTS, AppComponent } from './app/components/index';
import { routes } from './app/components/app.routes';

// feature modules
import { CoreModule } from './app/modules/core/core.module';
import { AppReducer } from './app/modules/ngrx/index';
import { AnalyticsModule } from './app/modules/analytics/analytics.module';
import { MultilingualModule, translateLoaderFactory } from './app/modules/i18n/multilingual.module';
import { MultilingualEffects, LanguageProviders, Languages } from './app/modules/i18n/index';
import { SampleModule } from './app/modules/sample/sample.module';
import { NameListEffects } from './app/modules/sample/index';

// config
import { Config, WindowService, ConsoleService, createConsoleTarget, provideConsoleTarget, LogTarget, LogLevel, ConsoleTarget } from './app/modules/core/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;
if (String('<%= BUILD_TYPE %>') === 'dev') {
  // only output console logging in dev mode
  Config.DEBUG.LEVEL_4 = true;
}

let routerModule = RouterModule.forRoot(routes);

if (String('<%= TARGET_DESKTOP %>') === 'true') {
  Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  routerModule = RouterModule.forRoot(routes, { useHash: true });
}

declare var window, console;

// For AoT compilation to work:
export function win() {
  return window;
}
export function cons() {
  return console;
}
export function consoleLogTarget(consoleService: ConsoleService) {
  return new ConsoleTarget(consoleService, { minLogLevel: LogLevel.Debug });
}

let DEV_IMPORTS: any[] = [];

if (String('<%= BUILD_TYPE %>') === 'dev') {
  DEV_IMPORTS = [
    ...DEV_IMPORTS,
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ];
}

@NgModule({
  imports: [
    BrowserModule,
    CoreModule.forRoot([
      { provide: WindowService, useFactory: (win) },
      { provide: ConsoleService, useFactory: (cons) },
      { provide: LogTarget, useFactory: (consoleLogTarget), deps: [ConsoleService], multi: true }
    ]),
    routerModule,
    AnalyticsModule,
    MultilingualModule.forRoot([{
      provide: TranslateLoader,
      deps: [Http],
      useFactory: (translateLoaderFactory)
    }]),
    SampleModule,
    StoreModule.provideStore(AppReducer),
    EffectsModule.run(MultilingualEffects),
    EffectsModule.run(NameListEffects),
    // dev environment only imports
    DEV_IMPORTS,
  ],
  declarations: [
    APP_COMPONENTS
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    },
    // default language providers
    LanguageProviders,
    // override with supported languages
    {
      provide: Languages,
      useValue: Config.GET_SUPPORTED_LANGUAGES()
    }
  ],
  bootstrap: [AppComponent]
})

export class WebModule { }
