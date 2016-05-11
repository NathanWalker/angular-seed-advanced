// libs
import {provideStore} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';

// app
import {t, TEST_ROUTER_PROVIDERS} from '../../test.framework/index';
import {ANALYTICS_PROVIDERS} from '../../analytics.framework/index';
import {NameListService, nameListReducer} from './name-list.service';

export function main() {
  t.describe('app.framework: NameListService', () => {
    t.bep(() => {
      return [
        provideStore({ names: nameListReducer }),
        TEST_ROUTER_PROVIDERS(),
        ANALYTICS_PROVIDERS,
        NameListService
      ];
    });

    t.it('names should be Observable', t.inject([NameListService], (nameList: NameListService) => {
      let names = nameList.names;
      t.e(names).toEqual(jasmine.any(Observable));
      return new Promise((resolve) => {
        names.subscribe((names: Array<string>) => {
          t.e(names).toEqual(['Edsger Dijkstra', 'Donald Knuth', 'Alan Turing', 'Grace Hopper']);
          resolve();
        });
      });
      
    }));

    t.it('add should work', t.inject([NameListService], (nameList: NameListService) => {
      nameList.add('test');
      return new Promise((resolve) => {
        nameList.names.subscribe((names: Array<string>) => {
          t.e(names).toEqual(['Edsger Dijkstra', 'Donald Knuth', 'Alan Turing', 'Grace Hopper', 'test']);
          resolve();
        });
      });
    }));  
  });
}
