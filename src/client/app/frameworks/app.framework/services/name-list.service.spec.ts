import {Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

// libs
import {provideStore} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';

// app
import {t, TEST_ROUTER_PROVIDERS, GET_HTTP_PROVIDERS_INJECTOR} from '../../test.framework/index';
import {ANALYTICS_PROVIDERS} from '../../analytics.framework/index';
import {NameListService, nameListReducer} from './name-list.service';

export function main() {
  t.describe('app.framework: NameListService', () => {
    let nameList: NameListService;
    
    t.be(() => {
      let injector = GET_HTTP_PROVIDERS_INJECTOR([
        provideStore({ names: nameListReducer }),
        TEST_ROUTER_PROVIDERS(),
        ANALYTICS_PROVIDERS,
        NameListService
      ]);
      
      let backend = injector.get(MockBackend);  
      let connection: any;
      backend.connections.subscribe((c: any) => connection = c);
      nameList = injector.get(NameListService);
      connection.mockRespond(new Response(new ResponseOptions({ body: '["Dijkstra", "Hopper"]' })));
    });

    t.it('names should be Observable', () => {
      let names = nameList.names;
      t.e(names).toEqual(jasmine.any(Observable));
      return new Promise((resolve) => {
        names.subscribe((names: Array<string>) => {
          t.e(names).toEqual(['Dijkstra', 'Hopper']);
          resolve();
        });
      });
      
    });

    t.it('add should work', () => {
      nameList.add('test');
      return new Promise((resolve) => {
        nameList.names.subscribe((names: Array<string>) => {
          t.e(names).toEqual(['Dijkstra', 'Hopper', 'test']);
          resolve();
        });
      });
    });  
  });
}
