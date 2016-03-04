import {Reducer, Action} from '@ngrx/store';

export interface IRoute {
  isChanging?: boolean;
  name: string;
  title: string;
}

export const ROUTE_CHANGING: string = 'ROUTE_CHANGING';
export const ROUTE_CHANGED: string = 'ROUTE_CHANGED';

export const RouteReducer: Reducer<IRoute> = (state: IRoute = { isChanging: false, name: 'Home', title: 'Home' }, action: Action) => {
  let reduceRoute = (changing: boolean) => {
    return Object.assign({}, state, action.payload, {isChanging: changing});
  };
  switch (action.type) {
    case ROUTE_CHANGING:
      return reduceRoute(true);
    case ROUTE_CHANGED:
      return reduceRoute(false);
    default:
      return state;
  }
};

