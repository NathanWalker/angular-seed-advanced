// angular
import {provide} from 'angular2/core';
import {Location, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {RootRouter} from 'angular2/src/router/router';

// app
import {TestComponent} from '../mocks/component.mock';

export function TEST_ROUTER_PROVIDERS(options?: any): any[] {
  let primary = TestComponent;
  if (options) {
    if (options.router && options.router.primary) {
      primary = options.router.primary;
    }
  }

  return [
    RouteRegistry,
    provide(Location, { useClass: SpyLocation }),
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: primary }),
    provide(Router, { useClass: RootRouter })
  ];
}
