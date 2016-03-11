// angular
import {Injectable} from 'angular2/core';

// libs
import {Store, Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';

// app
import {NameListService} from '../scientists/services/name-list.service';
import {SCIENTISTS_NAME_ADDED} from './scientists.reducer';

@Injectable()
export class ScientistsActions {
  private actions$: BehaviorSubject<Action> = new BehaviorSubject({ type: null, payload: null });

  constructor(
    private store: Store<any>,
    private nameList: NameListService
  ) {

    const nameAdded = this.actions$
      .filter((action: Action) => action.type === SCIENTISTS_NAME_ADDED)
      .do((action : Action) => {
        this.nameList.add(action.payload.name);
      });

    Observable
      .merge(nameAdded)
      .subscribe((action: Action) => store.dispatch(action));
  }

  add(name: string) {
    this.actions$.next({ type: SCIENTISTS_NAME_ADDED, payload: { name } });
  }
}
