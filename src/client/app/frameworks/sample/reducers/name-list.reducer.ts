import { Observable } from 'rxjs/Observable';
import { ISampleState } from '../state/name-list.state';
import * as nameList from '../actions/name-list.action';

const initialState: ISampleState = {
  names: <Array<string>>[]
};

export function reducer(
    state: ISampleState = initialState,
    action: nameList.Actions
): ISampleState {
  switch (action.type) {
    case nameList.ActionTypes.INITIALIZED:
      return (<any>Object).assign({}, state, { names: action.payload });
    case nameList.ActionTypes.NAME_ADDED:
      return (<any>Object).assign({}, state, { names: [...state.names, action.payload] });
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
export function getNames(state$: Observable<ISampleState>) {
  return state$.select(state => state.names);
}
