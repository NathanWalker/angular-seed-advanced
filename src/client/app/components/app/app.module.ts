import {NgModule} from '@angular/core';
import {APP_BASE_HREF, CommonModule, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {routes, APP_ROUTER_PROVIDERS} from './app.routes';

import {AboutModule} from '../about/about.module';
import {HomeModule} from '../home/home.module';
import {MainModule} from '../../frameworks/ngModules/main.module';
import {BrowserModule} from '@angular/platform-browser';

import {ANALYTICS_PROVIDERS} from '../../frameworks/analytics/index';
import {Config} from '../../frameworks/core/utils/config';
import {APP_PROVIDERS} from '../../frameworks/app/index';
import {WindowService} from '../../frameworks/core/services/window.service';
import {CORE_PROVIDERS} from '../../frameworks/core/index';
import {ConsoleService} from '../../frameworks/core/services/console.service';
import {FormsModule} from '@angular/forms';


let BOOTSTRAP_PROVIDERS: any[] = [
  {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'},
  {provide: WindowService, useValue: window },
  {provide: ConsoleService, useValue: console },
  CORE_PROVIDERS,
  ANALYTICS_PROVIDERS,
  APP_PROVIDERS,
  APP_ROUTER_PROVIDERS
];

if ('<%= TARGET_DESKTOP %>' === 'true') {
  Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  BOOTSTRAP_PROVIDERS.push({provide: LocationStrategy, useClass: HashLocationStrategy});
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AboutModule,
    HomeModule,
    MainModule.forRoot(),
    FormsModule
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    },
    BOOTSTRAP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
