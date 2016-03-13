// angular
import {Injectable, Inject, forwardRef} from 'angular2/core';

// libs
import {Store, Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';

// app
import {NameListService} from '../scientists/services/name-list.service';
import {SCIENTISTS_INIT, SCIENTISTS_NAME_ADDED} from './scientists.reducer';

@Injectable()
export class ScientistsActions {
  private actions$: BehaviorSubject<Action> = new BehaviorSubject({ type: null, payload: null });
  private initialized: boolean = false;

  constructor(
    private store: Store<any>,
    @Inject(forwardRef(() => NameListService)) private nameList: NameListService
  ) {

    const listInit = this.actions$
      .filter((action: Action) => action.type === SCIENTISTS_INIT);

    const nameAdded = this.actions$
      .filter((action: Action) => action.type === SCIENTISTS_NAME_ADDED)
      .do((action : Action) => {
        this.nameList.add(action.payload.name);
      });

    Observable
      .merge(nameAdded, listInit)
      .subscribe(store);

    this.init(nameList.get());    
  }

  public init(list: Array<string>) {
    if (!this.initialized) {
      this.initialized = true;
      this.actions$.next({ type: SCIENTISTS_INIT, payload: list });
    }
  }  

  public add(name: string) {
    this.actions$.next({ type: SCIENTISTS_NAME_ADDED, payload: name });
  }
}
