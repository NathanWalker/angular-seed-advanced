import {Injectable} from 'angular2/core';

// libs
import {Store, Reducer, Action} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';

const initialState: Array<string> = [
  'Edsger Dijkstra',
  'Donald Knuth',
  'Alan Turing',
  'Grace Hopper'
];

export const NAME_LIST_ACTIONS: any = {
  NAME_ADDED: '[NameList] NAME_ADDED'
};

export const nameListReducer: Reducer<any> = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case NAME_LIST_ACTIONS.NAME_ADDED:
      return [...state, action.payload];
    default:
      return state;
  }
};

@Injectable()
export class NameListService {
  public names: Observable<any>;

  constructor(private store: Store<any>) {
    this.names = store.select('names');
  }  

  add(name: string): void {
    this.store.dispatch({ type: NAME_LIST_ACTIONS.NAME_ADDED, payload: name });
  }
}
