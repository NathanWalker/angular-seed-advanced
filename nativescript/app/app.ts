import 'reflect-metadata';
import 'rxjs/add/operator/map';

// nativescript
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {NS_ROUTER_PROVIDERS, NS_ROUTER_DIRECTIVES} from 'nativescript-angular/router';

// angular 
import {provide, enableProdMode} from 'angular2/core';

// config
import {CoreConfigService, WindowService} from './frameworks/core.framework/index';
CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.MOBILE_NATIVE;
CoreConfigService.DEBUG.LEVEL_4 = true;
CoreConfigService.ROUTER_DIRECTIVES = NS_ROUTER_DIRECTIVES;

// app
import {NS_APP_PROVIDERS} from './frameworks/nativescript.framework/index';
import {NSAppComponent} from './pages/app/app.component';
import {WindowNative, ModalNative} from './shared/core/index';
  
enableProdMode();

nativeScriptBootstrap(NSAppComponent, [
  provide(WindowService, { useClass: WindowNative }),
  ModalNative,
  NS_ROUTER_PROVIDERS,
  NS_APP_PROVIDERS
]);
