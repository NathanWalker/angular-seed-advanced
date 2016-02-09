// angular
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Location, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {RootRouter} from 'angular2/src/router/router';

// 3rd party dependencies
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {Window} from '../app.framework/core/services/window';
import {Console} from '../app.framework/core/services/console';
import {Log} from '../app.framework/core/services/log';
import {Multilingual} from '../app.framework/i18n/services/multilingual';

// mocks
import {WindowMock} from './core/mocks/iwindow.mock';
import {TranslateMock} from './libs/ng2-translate/ng2-translate.mock';

// convenient shorthand 
import {Ng2Jasmine, TestApi} from './shorthand/ng2-jasmine';
export const t: TestApi = Ng2Jasmine;

/*
** PROVIDERS
*/

// common
export function TEST_COMMON_PROVIDERS(options?: any): any[] {
  // options:
  // Window: token = custom window mock (mainly for changing out language)
  
  let providers = [
    Log,
    provide(Console, { useValue: console }),
    provide(Window, { useClass: (options && options.Window) || WindowMock }),
    provide(TranslateService, { useClass: TranslateMock })
  ];
  
  return providers;
}

// component
export function TEST_COMPONENT_PROVIDERS(options?: any): any[] {
  // options
  // http:            boolean = needs HTTP_PROVIDERS
  // router:          boolean = needs router
  // router_primary:  token   = component to use for ROUTER_PRIMARY_COMPONENT
  
  let providers: Array<any> = [
    TEST_COMMON_PROVIDERS(),
    provide(Multilingual, {
      useFactory: (translate, win) => {
        return new Multilingual(translate, win);
      },
      deps: [TranslateService, Window]
    })
  ];
  
  if (options) {
    
    if (options.http) {
      providers.push(HTTP_PROVIDERS);
    }
    
    if (options.router) {
      providers.push(...[
        RouteRegistry,
        provide(Location, {useClass: SpyLocation}),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: options.router_primary}),
        provide(Router, { useClass: RootRouter })
      ]);  
    }
  }

  return providers;  
}
