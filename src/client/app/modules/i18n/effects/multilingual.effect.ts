// angular
import { Injectable, Inject } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { includes, map } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// module
import { MultilingualService, Languages } from '../services/multilingual.service';
import * as multilingual from '../actions/multilingual.action';

@Injectable()
export class MultilingualEffects {

  @Effect() change$: Observable<Action> = this.actions$
    .ofType(multilingual.ActionTypes.CHANGE)
    .map(action => {
      let lang = action.payload;
      if (includes(map(this.languages, 'code'), lang)) {
        let langChangedAction = new multilingual.LangChangedAction(lang);
        // track analytics
        this.multilangService.track(langChangedAction.type, { label: langChangedAction.payload });
        // change state
        return new multilingual.LangChangedAction(lang);
      } else {
        // not supported (here for example)
        return new multilingual.LangUnsupportedAction(lang);
      }
    });

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private multilangService: MultilingualService,
    @Inject(Languages) private languages
  ) { }
}
