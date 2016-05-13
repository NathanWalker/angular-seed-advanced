// angular
import {HTTP_PROVIDERS} from '@angular/http';

// app
import {TEST_COMMON_PROVIDERS} from './common';
import {TEST_MULTILINGUAL_PROVIDERS} from './i18n';
import {TEST_ROUTER_PROVIDERS} from './router';

export function TEST_COMPONENT_PROVIDERS(options?: any): any[] {
  // options
  // http:            boolean = HTTP_PROVIDERS
  // router:          Object = router setup `{ primary: token }` (component to use for ROUTER_PRIMARY_COMPONENT)
  
  let providers: Array<any> = [
    TEST_COMMON_PROVIDERS(options),
    TEST_MULTILINGUAL_PROVIDERS()
  ];
  
  if (options) {
    
    if (options.http) {
      providers.push(HTTP_PROVIDERS);
    }
    
    if (options.router) {
      providers.push(TEST_ROUTER_PROVIDERS(options));  
    }
  }

  return providers;  
}
