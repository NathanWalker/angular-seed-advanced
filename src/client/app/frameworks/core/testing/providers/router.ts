// angular
import { Location, LocationStrategy, APP_BASE_HREF } from '@angular/common';
import { SpyLocation, MockLocationStrategy } from '@angular/common/testing';

export function TEST_LOCATION_PROVIDERS(): any[] {

  return [
    {provide: Location, useClass: SpyLocation},
    {provide: LocationStrategy, useClass: MockLocationStrategy},
    { provide: APP_BASE_HREF, useValue: '/' }
  ];
}
