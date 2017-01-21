// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// module
import { NameListService } from '../services/name-list.service';
import * as nameList from '../actions/name-list.action';

@Injectable()
export class NameListEffects {

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect() init$: Observable<Action> = this.actions$
    .ofType(nameList.ActionTypes.INIT)
    .startWith(new nameList.InitAction)
    .switchMap(() => this.nameListService.getNames())
    .map(payload => {
      let names = payload;
      return new nameList.InitializedAction(names);
    })
    // nothing reacting to failure at moment but you could if you want (here for example)
    .catch(() => Observable.of(new nameList.InitFailedAction()));

  @Effect() add$: Observable<Action> = this.actions$
    .ofType(nameList.ActionTypes.ADD)
    .map(action => {
      let name = action.payload;
      // analytics
      this.nameListService.track(nameList.ActionTypes.NAME_ADDED, { label: name });
      return new nameList.NameAddedAction(name);
    });

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private nameListService: NameListService
  ) { }
}
