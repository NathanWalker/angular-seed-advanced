// angular
import { Injectable } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// module
import { NameListService } from '../services/name-list.service';
import * as nameList from '../actions/name-list.action';

@Injectable()
export class NameListEffects {

  constructor(private store: Store<any>, private actions$: Actions, private nameListService: NameListService) { }

  @Effect() init$ = this.actions$
    .ofType(nameList.ActionTypes.INIT)
    // .map((action: nameList.InitializedAction) => {
    .switchMap((action: nameList.InitAction) => {
        return this.nameListService.getNames();
    })
    .map(payload => {
      let names = payload;
      return new nameList.InitializedAction(names);
    })
    // nothing reacting to failure at moment but you could if you want (here for example)
    .catch(() => Observable.of(new nameList.InitFailedAction()));

  @Effect() add$ = this.actions$
    .ofType(nameList.ActionTypes.ADD)
    .map(action => {
      let name = action.payload;
      // analytics
      this.nameListService.track(nameList.ActionTypes.NAME_ADDED, { label: name });
      return new nameList.NameAddedAction(name);
    });
}
