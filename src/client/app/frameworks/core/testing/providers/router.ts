// angular
import {ComponentResolver, Injector} from '@angular/core';
// import {ROUTER_FAKE_PROVIDERS} from '@angular/router/testing';
import {Location, LocationStrategy, HashLocationStrategy, PlatformLocation} from '@angular/common';
import {BrowserPlatformLocation} from '@angular/platform-browser';
import {SpyLocation} from '@angular/common/testing';
import {
  UrlSerializer,
  DefaultUrlSerializer,
  RouterOutletMap,
  Router,
  ActivatedRoute
} from '@angular/router';

export function TEST_ROUTER_PROVIDERS(options?: any): any[] {
  // config: RouterConfig
  // component: the test component to use

  return [
    RouterOutletMap,
    { provide: UrlSerializer, useClass: DefaultUrlSerializer },
    { provide: Location, useClass: SpyLocation },
    {
      provide: Router,
      useFactory: (
        resolver: ComponentResolver,
        urlSerializer: UrlSerializer,
        outletMap: RouterOutletMap,
        location: Location,
        injector: Injector) => {
        const r = new Router(options.component, resolver, urlSerializer, outletMap, location, injector, options.config);
        // r.initialNavigation();
        return r;
      },
      deps: [ComponentResolver, UrlSerializer, RouterOutletMap, Location, Injector]
    },
    { provide: ActivatedRoute, useFactory: (r: Router) => r.routerState.root, deps: [Router] },
    { provide: PlatformLocation, useClass: BrowserPlatformLocation },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ];
}
