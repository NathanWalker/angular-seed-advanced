import { ISampleState, initialState } from '../states/index';
import * as actions from '../actions/name-list.action';

export function reducer(
    state: ISampleState = initialState,
    action: actions.Actions
): ISampleState {
  switch (action.type) {
    case actions.ActionTypes.INITIALIZED:
      return (<any>Object).assign({}, state, {
        names: action.payload
      });

    case actions.ActionTypes.NAME_ADDED:
      return (<any>Object).assign({}, state, {
        names: [...state.names, action.payload]
      });

    default:
      return state;
  }
}
