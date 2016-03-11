import {Reducer, Action} from '@ngrx/store';

export interface IScientist {
  name: string;
}

export const SCIENTISTS_NAME_ADDED: string = 'SCIENTISTS_NAME_ADDED';

export const ScientistsReducer: Reducer<IScientist> = (state: IScientist = { name: '' }, action: Action) => {
  switch (action.type) {
    case SCIENTISTS_NAME_ADDED:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

