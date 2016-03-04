// import {Injector} from 'angular2/core';

// import {Store, Dispatcher, StoreBackend, Action, provideStore} from '@ngrx/store';

// import {t} from '../../../test.framework/index';
// import {RouteReducer, IRoute, ROUTE_CHANGING, ROUTE_CHANGED} from './route.reducer';

// export function main() {
//   t.describe('core.framework: RouteReducer', () => {
//     let injector: Injector;
//     let store: Store<IRoute>;
//     let dispatcher: Dispatcher<Action>;
    
//     t.be(() => {
//       const initialValue = { counter1: 0, counter2: 1 };

//       injector = Injector.resolveAndCreate([
//         provideStore({ routes: RouteReducer }, {})
//       ]);

//       store = injector.get(Store);
//       dispatcher = injector.get(Dispatcher);
//     });
    
//     const actionSequence = '--a--b--c--d--e';
//     const actionValues = {
//       a: { type: ROUTE_CHANGING, payload: { name: 'home', title: 'Home' }  },
//       b: { type: ROUTE_CHANGED, payload: { name: 'about', title: 'About' } }
//     };
    
//     t.it('should handle route changing and changed', () => {   
//       // const counterSteps = hot(actionSequence, actionValues);

//       // counterSteps.subscribe((action) => store.dispatch(action));

//       // const counterStateWithString = store.select('counter1');
//       // const counterStateWithFunc = store.select(s => s.counter1);

//       // const stateSequence = 'i-v--w--x--y--z';
//       // const counter1Values = { i: 0, v: 1, w: 2, x: 1, y: 0, z: 1 };

//       // expectObservable(counterStateWithString).toBe(stateSequence, counter1Values);
//       // expectObservable(counterStateWithFunc).toBe(stateSequence, counter1Values);
//     });
//   });
// }
