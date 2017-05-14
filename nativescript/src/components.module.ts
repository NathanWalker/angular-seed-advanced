// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Http } from '@angular/http';

// angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

// libs
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// app
import { AppComponent } from './app/components/app.component';
import { AboutComponent } from './app/components/about/about.component';
import { HomeComponent } from './app/components/home/home.component';
import { routes } from './app/components/app.routes';

// feature modules
import { CoreModule } from './app/modules/core/core.module';
import { AnalyticsModule } from './app/modules/analytics/analytics.module';
import { MultilingualModule, translateLoaderFactory } from './app/modules/i18n/multilingual.module';
import { SampleModule } from './app/modules/sample/sample.module';
import { ConsoleService, ConsoleTarget, LogLevel } from './app/modules/core/index';

// intermediate component module
// helps encapsulate custom native modules in with the components
// note: couple ways this could be done, just one option presented here...
@NgModule({
  imports: [
    AnalyticsModule,
    CoreModule,
    MultilingualModule.forRoot([{
      provide: TranslateLoader,
      deps: [Http],
      useFactory: (translateLoaderFactory)
    }]),
    SampleModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    MultilingualModule,
    AppComponent,
    AnalyticsModule,
    CoreModule,
    SampleModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
  ]
})
export class ComponentsModule { }

// For AoT compilation to work:
export function cons() {
  return console;
}

export function consoleLogTarget(service: ConsoleService) {
  return new ConsoleTarget(service, { minLogLevel: LogLevel.Debug });
}
