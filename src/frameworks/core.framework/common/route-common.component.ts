// angular
import {OnActivate, CanDeactivate, ComponentInstruction} from 'angular2/router';

// libs
import {Store} from '@ngrx/store';

// app
import {ROUTE_CHANGING, ROUTE_CHANGED, IRoute} from '../index';

export class RouteCommon implements OnActivate, CanDeactivate {
  public routeDesc: IRoute;
  
  constructor(private rxStore: Store<any>) { }
  
  routerOnActivate(nextInstruction: ComponentInstruction, prevInstruction: ComponentInstruction): any {
    this.rxStore.dispatch({ type: ROUTE_CHANGED, payload: this.routeDesc });
  }
  
  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    this.rxStore.dispatch({ type: ROUTE_CHANGING, payload: this.routeDesc });
    return true;
  }
}
