// angular
import {Injectable} from 'angular2/core';

// libs
import {Store, Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';

// app
import {MultilingualService} from '../services/multilingual.service';
import {I18N_LANG_CHANGE} from './multilingual.reducer';

@Injectable()
export class MultilingualActions {
  private actions$: BehaviorSubject<Action> = new BehaviorSubject({ type: null, payload: null });

  constructor(
    private store: Store<any>,
    private multilang: MultilingualService
  ) {

    const langChange = this.actions$
      .filter((action: Action) => action.type === I18N_LANG_CHANGE)
      .do((action : Action) => {
        this.multilang.changeLang(action.payload.lang);
      });

    Observable
      .merge(langChange)
      .subscribe(store);
  }

  changeLang(lang: string) {
    this.actions$.next({ type: I18N_LANG_CHANGE, payload: { lang } });
  }
}
