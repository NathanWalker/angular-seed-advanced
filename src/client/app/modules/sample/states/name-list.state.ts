import { Observable } from 'rxjs/Observable';

export interface ISampleState {
  names: Array<string>;
}

export const initialState: ISampleState = {
  names: <Array<string>>[]
};

export function getNames(state$: Observable<ISampleState>) {
  return state$.select(state => state.names);
}
