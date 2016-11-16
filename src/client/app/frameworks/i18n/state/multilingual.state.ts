import { Observable } from 'rxjs/Observable';

export interface IMultilingualState {
  lang: string;
}

export function getLang(state$: Observable<IMultilingualState>) {
  return state$.select(state => state.lang);
}
