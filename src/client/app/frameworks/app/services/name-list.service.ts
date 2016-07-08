import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

// libs
import {Store, ActionReducer, Action} from '@ngrx/store';

// app
import {Analytics, AnalyticsService} from '../../analytics/index';
import {HttpService} from '../../core/index';

// analytics
const CATEGORY: string = 'NameList';

/**
 * ngrx setup start --
 */
export const NAME_LIST_ACTIONS: any = {
  INIT: `[${CATEGORY}] INIT`,
  NAME_ADDED: `[${CATEGORY}] NAME_ADDED`
};

export const nameListReducer: ActionReducer<any> = (state: any = [], action: Action) => {
  switch (action.type) {
    case NAME_LIST_ACTIONS.INIT:
      return [...action.payload];
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

  constructor(public analytics: AnalyticsService, private store: Store<any>, private http: HttpService) {
    super(analytics);
    this.category = CATEGORY;

    this.names = store.select('names');

    this.init();
  }  

  init() {
    this.http.get(`assets/data.json`)
      .subscribe((results: string[]) => {
        this.store.dispatch({ type: NAME_LIST_ACTIONS.INIT, payload: results });
      });
  }

  add(name: string): void {
    this.track(NAME_LIST_ACTIONS.NAME_ADDED, { label: name });
    this.store.dispatch({ type: NAME_LIST_ACTIONS.NAME_ADDED, payload: name });
  }
}
