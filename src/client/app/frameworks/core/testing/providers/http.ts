// angular
import {ReflectiveInjector, provide} from '@angular/core';
import {BaseRequestOptions, ConnectionBackend, Http, HTTP_PROVIDERS} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

let providers: any[] = [
  HTTP_PROVIDERS,
  BaseRequestOptions,
  MockBackend,
  provide(Http, {
    useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
      return new Http(backend, defaultOptions);
    },
    deps: [MockBackend, BaseRequestOptions]
  })
];

/*
* For instances where you need the injector
* @returns `ReflectiveInjector`
*/
export function GET_HTTP_PROVIDERS_INJECTOR(additionalProviders?: any[]): ReflectiveInjector {
  
  if (additionalProviders) {
    providers = providers.concat(additionalProviders);
  }  

  return ReflectiveInjector.resolveAndCreate(providers);  
}

/*
* For testing http services
* @returns `any[]`
*/
export function TEST_HTTP_PROVIDERS(): any[] {
  return providers; 
}


      
