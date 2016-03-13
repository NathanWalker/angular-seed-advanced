import {Reducer, Action} from '@ngrx/store';

export interface IScientist {
  names?: Array<string>;
}

export const SCIENTISTS_INIT: string = 'SCIENTISTS_INIT';
export const SCIENTISTS_NAME_ADDED: string = 'SCIENTISTS_NAME_ADDED';

export const ScientistsReducer: Reducer<IScientist> = (state: IScientist = { names: [] }, action: Action) => {
  let reduceList = (payload: Array<string>) => {
    return Object.assign({}, state, {names: state.names.concat(payload) });
  };
  switch (action.type) {
    case SCIENTISTS_INIT:
      return reduceList(action.payload);
    case SCIENTISTS_NAME_ADDED:
      return reduceList([action.payload]);
    default:
      return state;
  }
};

