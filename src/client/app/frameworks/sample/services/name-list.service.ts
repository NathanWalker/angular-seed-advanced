import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// libs
import { Store, ActionReducer, Action } from '@ngrx/store';

// app
import { Config } from '../../core/index';
import { Analytics, AnalyticsService } from '../../analytics/index';

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

  constructor(public analytics: AnalyticsService, private store: Store<any>, private http: Http) {
    super(analytics);
    this.category = CATEGORY;

    this.names = store.select('names');

    this.init();
  }

  init() {
    // {N} needs absolute path
    // web and desktop are best to use relative
    this.http.get(`${Config.IS_MOBILE_NATIVE() ? '/' : ''}assets/data.json`).map(res => res.json())
      .subscribe((results: any) => {
        this.store.dispatch({ type: NAME_LIST_ACTIONS.INIT, payload: results });
      });
  }

  add(name: string): void {
    this.track(NAME_LIST_ACTIONS.NAME_ADDED, { label: name });
    this.store.dispatch({ type: NAME_LIST_ACTIONS.NAME_ADDED, payload: name });
  }
}
