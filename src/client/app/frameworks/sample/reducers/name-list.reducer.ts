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
      return (<any>Object).assign({}, state, {
        names: action.payload
      });

    case nameList.ActionTypes.NAME_ADDED:
      return (<any>Object).assign({}, state, {
        names: [...state.names, action.payload]
      });
      
    default:
      return state;
  }
}
