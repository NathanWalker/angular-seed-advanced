// libs
import {provideStore} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';

// app
import {t} from '../../test.framework/index';
import {NameListService, nameListReducer} from './name-list.service';

export function main() {
  t.describe('app.framework: NameListService', () => {
    t.bep(() => {
      return [
        provideStore({names: nameListReducer}),
        NameListService
      ];
    });

    t.it('names should be Observable', t.inject([NameListService], (nameList: NameListService) => {
      let names = nameList.names;
      t.e(names).toEqual(jasmine.any(Observable));
      names.subscribe((names: Array<string>) => {
        t.e(names).toEqual(['Edsger Dijkstra', 'Donald Knuth', 'Alan Turing', 'Grace Hopper']);
      });
    }));

    t.it('add should work', t.inject([NameListService], (nameList: NameListService) => {
      nameList.add('test');
      nameList.names.subscribe((names: Array<string>) => {
        t.e(names).toEqual(['Edsger Dijkstra', 'Donald Knuth', 'Alan Turing', 'Grace Hopper', 'test']);
      });
    }));  
  });
}
