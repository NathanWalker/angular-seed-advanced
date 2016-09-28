import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// libs
import { Store, ActionReducer, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

// app
import { Config } from '../../core/index';
import { Analytics, AnalyticsService } from '../../analytics/index';

// analytics
const CATEGORY: string = 'NameList';

/**
 * ngrx setup start --
 */
interface INameListActions {
  INIT: string;
  INITIALIZED: string;
  INIT_FAILED: string;
  ADD: string;
  NAME_ADDED: string;
}

export const NAME_LIST_ACTIONS: INameListActions = {
  INIT: `${CATEGORY}_INIT`,
  INITIALIZED: `${CATEGORY}_INITIALIZED`,
  INIT_FAILED: `${CATEGORY}_INIT_FAILED`,
  ADD: `${CATEGORY}_ADD`,
  NAME_ADDED: `${CATEGORY}_NAME_ADDED`
};

export const nameListReducer: ActionReducer<any> = (state: any = [], action: Action) => {
  switch (action.type) {
    case NAME_LIST_ACTIONS.INITIALIZED:
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

  constructor(public analytics: AnalyticsService, private store: Store<any>) {
    super(analytics);
    this.category = CATEGORY;

    this.store.dispatch({ type: NAME_LIST_ACTIONS.INIT });
  }
}

@Injectable()
export class NameListEffects {

  @Effect() init$ = this.actions$
    .ofType(NAME_LIST_ACTIONS.INIT)
    .switchMap(action => this.http.get(`${Config.IS_MOBILE_NATIVE() ? '/' : ''}assets/data.json`))
    .map(res => ({ type: NAME_LIST_ACTIONS.INITIALIZED, payload: res.json() }))
    // nothing reacting to failure at moment but you could if you want (here for example)
    .catch(() => Observable.of({ type: NAME_LIST_ACTIONS.INIT_FAILED }));

  @Effect() add$ = this.actions$
    .ofType(NAME_LIST_ACTIONS.ADD)
    .map(action => {
      let name = action.payload;
      // analytics
      this.nameList.track(NAME_LIST_ACTIONS.NAME_ADDED, { label: name });
      return ({ type: NAME_LIST_ACTIONS.NAME_ADDED, payload: name });
    });

  constructor(private store: Store<any>, private actions$: Actions, private nameList: NameListService, private http: Http) { }

}
