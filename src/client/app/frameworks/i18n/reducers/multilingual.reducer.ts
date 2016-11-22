import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { IMultilingualState } from '../state/multilingual.state';
import * as multilingual from '../actions/multilingual.action';

const initialState: IMultilingualState = {
  lang: 'en'
};

export function reducer(
    state: IMultilingualState = initialState,
    action: multilingual.Actions
): IMultilingualState {
  switch (action.type) {
    case multilingual.ActionTypes.LANG_CHANGED:
      return (<any>Object).assign({}, state, { lang: action.payload });
    default:
      return state;
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */
export function getLang(state$: Observable<IMultilingualState>) {
  return state$.select(state => state.lang);
}
