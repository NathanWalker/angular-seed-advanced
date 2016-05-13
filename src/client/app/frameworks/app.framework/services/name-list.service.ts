import {Injectable} from '@angular/core';

// libs
import {Store, Reducer, Action} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';

// app
import {Analytics, AnalyticsService} from '../../analytics.framework/index';

// analytics
const CATEGORY: string = 'NameList';

/**
 * ngrx setup start --
 */
const initialState: Array<string> = [
  'Edsger Dijkstra',
  'Donald Knuth',
  'Alan Turing',
  'Grace Hopper'
];

export const NAME_LIST_ACTIONS: any = {
  NAME_ADDED: `[${CATEGORY}] NAME_ADDED`
};

export const nameListReducer: Reducer<any> = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case NAME_LIST_ACTIONS.NAME_ADDED:
      return [...state, action.payload];
    default:
      return state;
  }
};
/**
 * ngrx end --
 */

@Injectable()
export class NameListService extends Analytics {
  public names: Observable<any>;

  constructor(public analytics: AnalyticsService, private store: Store<any>) {
    super(analytics);
    this.category = CATEGORY;

    this.names = store.select('names');
  }  

  add(name: string): void {
    this.track(NAME_LIST_ACTIONS.NAME_ADDED, { label: name });
    this.store.dispatch({ type: NAME_LIST_ACTIONS.NAME_ADDED, payload: name });
  }
}
