// angular
import {ComponentResolver, Injector, NgModuleFactoryLoader} from '@angular/core';
import {Location, LocationStrategy} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {SpyNgModuleFactoryLoader} from '@angular/router/testing/router_testing_module';
import {
  RouterOutletMap,
  UrlSerializer,
  DefaultUrlSerializer,
  Router,
  ActivatedRoute
} from '@angular/router';
import {MockLocationStrategy} from '../mocks/mock-location-strategy';

export function TEST_ROUTER_PROVIDERS(options?: any): any[] {
  // config: RouterConfig
  // component: the test component to use

  return [
    RouterOutletMap,
    { provide: UrlSerializer, useClass: DefaultUrlSerializer },
    { provide: Location, useClass: SpyLocation },
    { provide: NgModuleFactoryLoader, useClass: SpyNgModuleFactoryLoader },
    { provide: LocationStrategy, useClass: MockLocationStrategy },
    {
      provide: Router,
      useFactory: (resolver: ComponentResolver, urlSerializer: UrlSerializer,
        outletMap: RouterOutletMap, location: Location, injector: Injector, ngModuleFactoryLoader: NgModuleFactoryLoader) => {
        return new Router(
          options.component, resolver, urlSerializer, outletMap, location, injector, ngModuleFactoryLoader, options.config);
      },
      deps: [ComponentResolver, UrlSerializer, RouterOutletMap, Location, Injector]
    },
    {
      provide: ActivatedRoute,
      useFactory: (r: Router) => r.routerState.root,
      deps: [Router]
    }
  ];
}
