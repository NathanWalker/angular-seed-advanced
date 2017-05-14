// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// module
import { NameListService } from '../services/name-list.service';
import { NameList } from '../actions/index';

@Injectable()
export class SampleEffects {

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect() init$: Observable<Action> = this.actions$
    .ofType(NameList.ActionTypes.INIT)
    .startWith(new NameList.InitAction)
    .switchMap(() => this.nameListService.getNames())
    .map(payload => {
      let names = payload;
      return new NameList.InitializedAction(names);
    })
    // nothing reacting to failure at moment but you could if you want (here for example)
    .catch(() => Observable.of(new NameList.InitFailedAction()));

  @Effect() add$: Observable<Action> = this.actions$
    .ofType(NameList.ActionTypes.ADD)
    .map(action => {
      let name = action.payload;
      // analytics
      this.nameListService.track(NameList.ActionTypes.NAME_ADDED, { label: name });
      return new NameList.NameAddedAction(name);
    });

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private nameListService: NameListService
  ) { }
}
