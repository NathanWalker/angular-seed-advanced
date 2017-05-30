// nativescript
import {
  NativeScriptRouterModule,
  RouterExtensions as TNSRouterExtensions
} from 'nativescript-angular/router';
import { SegmentedBarItem } from 'tns-core-modules/ui/segmented-bar';

// angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// app
import {
  WindowService,
  StorageService,
  ConsoleService,
  RouterExtensions,
  AppService
} from './app/modules/core/index';
import { AppComponent } from './app/components/app.component';
import { routes } from './app/components/app.routes';

// feature modules
import { CoreModule } from './app/modules/core/core.module';
import { AppReducer } from './app/modules/ngrx/index';
import { MultilingualEffects } from './app/modules/i18n/index';
import { SampleEffects } from './app/modules/sample/index';
import { ComponentsModule, cons, consoleLogTarget } from './components.module';

// {N} custom app specific
import { WindowNative, StorageNative, NSAppService } from './mobile/core/index';
import { NS_ANALYTICS_PROVIDERS } from './mobile/analytics/index';

/**
 * Config
 * Seed provided configuration options
 */
import { Config, LogTarget } from './app/modules/core/index';
import { Page } from 'ui/page';
Config.PageClass = Page;

// (required) platform target (allows component decorators to use the right view template)
Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

// (optional) log level - defaults to no logging if not set
Config.DEBUG.LEVEL_4 = true;

import { Languages, LanguageViewHelper } from './app/modules/i18n/index';

// helper for SegmentedBar view bindings in lang-switcher shared component
export function segmentViewHelper(languages) {
  let segmentItems = [];
  for (let lang of languages) {
    // {N} requires items to be SegmentedBarItem class
    let item = new SegmentedBarItem();
    item.title = lang.title;
    (<any>item).code = lang.code;
    segmentItems.push(item);
  }
  return segmentItems;
}

@NgModule({
  imports: [
    CoreModule.forRoot([
      { provide: WindowService, useClass: WindowNative },
      { provide: StorageService, useClass: StorageNative },
      { provide: ConsoleService, useFactory: (cons) },
      { provide: LogTarget, multi: true, deps: [ConsoleService], useFactory: (consoleLogTarget) }
    ]),
    ComponentsModule,
    NativeScriptRouterModule.forRoot(<any>routes),
    StoreModule.provideStore(AppReducer),
    EffectsModule.run(MultilingualEffects),
    EffectsModule.run(SampleEffects)
  ],
  providers: [
    NS_ANALYTICS_PROVIDERS,
    { provide: RouterExtensions, useClass: TNSRouterExtensions },
    { provide: AppService, useClass: NSAppService },
    // i18n
    { provide: Languages, useValue: Config.GET_SUPPORTED_LANGUAGES() },
    { provide: LanguageViewHelper, deps: [Languages], useFactory: (segmentViewHelper) }
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class NativeModule { }
