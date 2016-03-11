// angular
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Location, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {RootRouter} from 'angular2/src/router/router';

// app
import {TEST_COMMON_PROVIDERS} from './common';
import {TEST_MULTILINGUAL_PROVIDERS} from './i18n';

// component
export function TEST_COMPONENT_PROVIDERS(options?: any): any[] {
  // options
  // http:            boolean = HTTP_PROVIDERS
  // router:          Object = router setup `{ primary: token }` (component to use for ROUTER_PRIMARY_COMPONENT)
  
  let providers: Array<any> = [
    TEST_COMMON_PROVIDERS(),
    TEST_MULTILINGUAL_PROVIDERS()
  ];
  
  if (options) {
    
    if (options.http) {
      providers.push(HTTP_PROVIDERS);
    }
    
    if (options.router) {
      providers.push(...[
        RouteRegistry,
        provide(Location, {useClass: SpyLocation}),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: options.router.primary}),
        provide(Router, { useClass: RootRouter })
      ]);  
    }
  }

  return providers;  
}
