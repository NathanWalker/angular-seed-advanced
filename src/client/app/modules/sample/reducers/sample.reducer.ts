import { ISampleState, sampleInitialState } from '../states/index';
import { NameList } from '../actions/index';

export function reducer(
  state: ISampleState = sampleInitialState,
  // could support multiple state actions via union type here
  // ie: NameList.Actions | Other.Actions
  // the seed's example just has one set of actions: NameList.Actions
  action: NameList.Actions
): ISampleState {
  switch (action.type) {
    case NameList.ActionTypes.INITIALIZED:
      return (<any>Object).assign({}, state, {
        names: action.payload
      });

    case NameList.ActionTypes.NAME_ADDED:
      return (<any>Object).assign({}, state, {
        names: [...state.names, action.payload]
      });

    default:
      return state;
  }
}
