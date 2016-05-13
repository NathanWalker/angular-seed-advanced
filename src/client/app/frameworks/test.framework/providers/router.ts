// angular
import {provide} from '@angular/core';
import {Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from '@angular/router-deprecated';
// import {ROUTER_FAKE_PROVIDERS} from '@angular/router/testing';
import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {RootRouter} from '@angular/router-deprecated/src/router';

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
    // ROUTER_FAKE_PROVIDERS
    RouteRegistry,
    provide(Location, { useClass: SpyLocation }),
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: primary }),
    provide(Router, { useClass: RootRouter })
  ];
}
