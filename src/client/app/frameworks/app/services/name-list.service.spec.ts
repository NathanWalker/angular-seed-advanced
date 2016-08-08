import {Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

// libs
import {provideStore} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';

// app
import {t} from '../../test/index';
import {TEST_CORE_PROVIDERS, GET_HTTP_PROVIDERS_INJECTOR, TEST_ROUTER_PROVIDERS} from '../../core/testing/index';
import {NameListService, nameListReducer} from './name-list.service';

export function main() {
  t.describe('app: NameListService', () => {
    let nameList: NameListService;
    
    t.be(() => {
      let injector = GET_HTTP_PROVIDERS_INJECTOR([
        TEST_CORE_PROVIDERS(),
        TEST_ROUTER_PROVIDERS(),
        provideStore({ names: nameListReducer }),
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
      names.subscribe((names: Array<string>) => {
        t.e(names).toEqual(['Dijkstra', 'Hopper']);
      });
    });

    t.it('add should work', () => {
      nameList.add('test');
      nameList.names.subscribe((names: Array<string>) => {
        t.e(names).toEqual(['Dijkstra', 'Hopper', 'test']);
      });
    });  
  });
}
