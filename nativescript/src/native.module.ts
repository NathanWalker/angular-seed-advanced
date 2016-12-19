// nativescript
import {
  NativeScriptRouterModule,
  RouterExtensions as TNSRouterExtensions
} from 'nativescript-angular';

// angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// app
import {
  WindowService,
  ConsoleService,
  RouterExtensions,
  AppService
} from './app/frameworks/core/index';
import { AppComponent } from './app/components/app.component';
import { routes } from './app/components/app.routes';

// feature modules
import { CoreModule } from './app/frameworks/core/core.module';
import { AppReducer } from './app/frameworks/ngrx/index';
import { MultilingualEffects } from './app/frameworks/i18n/index';
import { NameListEffects } from './app/frameworks/sample/index';
import { ComponentsModule, cons } from './components.module';

// {N} custom app specific
import { WindowNative, NSAppService } from './shared/core/index';
import { NS_ANALYTICS_PROVIDERS } from './shared/nativescript/index';

@NgModule({
  imports: [
    CoreModule.forRoot([
      { provide: WindowService, useClass: WindowNative },
      { provide: ConsoleService, useFactory: (cons) }
    ]),
    ComponentsModule,
    NativeScriptRouterModule.forRoot(<any>routes),
    StoreModule.provideStore(AppReducer),
    EffectsModule.run(MultilingualEffects),
    EffectsModule.run(NameListEffects)
  ],
  providers: [
    NS_ANALYTICS_PROVIDERS,
    { provide: RouterExtensions, useClass: TNSRouterExtensions },
    { provide: AppService, useClass: NSAppService },
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class NativeModule { }
