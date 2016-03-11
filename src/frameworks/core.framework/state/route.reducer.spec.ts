import {Injector} from 'angular2/core';

// import {Store, Dispatcher, StoreBackend, Action, provideStore} from '@ngrx/store';
import {Store, Dispatcher, Action, provideStore} from '@ngrx/store';

import {t} from '../../test.framework/index';
// import {RouteReducer, IRoute, ROUTE_CHANGING, ROUTE_CHANGED} from './route.reducer';
import {RouteReducer, IRoute} from './route.reducer';

export function main() {
  // TODO
  t.xdescribe('core.framework: RouteReducer', () => {
    let injector: Injector;
    let store: Store<IRoute>;
    let dispatcher: Dispatcher<Action>;
    
    t.be(() => {
      const initialValue = {};

      injector = Injector.resolveAndCreate([
        provideStore({ routes: RouteReducer }, initialValue)
      ]);

      store = injector.get(Store);
      dispatcher = injector.get(Dispatcher);
    });
    
    // const actionSequence = '--a--b--c--d--e';
    // const actionValues = {
    //   a: { type: ROUTE_CHANGING, payload: { name: 'home', title: 'Home' }  },
    //   b: { type: ROUTE_CHANGED, payload: { name: 'about', title: 'About' } }
    // };
    
    t.it('should handle route changing and changed', () => {   
      // const counterSteps = hot(actionSequence, actionValues);

      // counterSteps.subscribe((action) => store.dispatch(action));

      // const counterStateWithString = store.select('counter1');
      // const counterStateWithFunc = store.select(s => s.counter1);

      // const stateSequence = 'i-v--w--x--y--z';
      // const counter1Values = { i: 0, v: 1, w: 2, x: 1, y: 0, z: 1 };

      // expectObservable(counterStateWithString).toBe(stateSequence, counter1Values);
      // expectObservable(counterStateWithFunc).toBe(stateSequence, counter1Values);
    });
  });
}
