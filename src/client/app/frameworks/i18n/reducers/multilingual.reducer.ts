// module
import { IMultilingualState, initialState } from '../states/multilingual.state';
import { Actions, ActionTypes } from '../actions/multilingual.action';

export function reducer(
    state: IMultilingualState = initialState,
    action: Actions
): IMultilingualState {
  switch (action.type) {
    case ActionTypes.LANG_CHANGED:
      if (state.lang !== action.payload)
        return (<any>Object).assign({}, state, {
            lang: action.payload
          });

      return state;
    default:
      return state;
  }
}
