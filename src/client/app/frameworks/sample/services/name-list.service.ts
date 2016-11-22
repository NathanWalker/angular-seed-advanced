// angular
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { Config } from '../../core/index';
import { Analytics, AnalyticsService } from '../../analytics/index';
import { Category } from '../../core/common/category.common';

// module
import { ISampleState } from '../state/name-list.state';
import * as nameList from '../actions/name-list.action';

@Injectable()
export class NameListService extends Analytics {

  constructor(public analytics: AnalyticsService, private store: Store<ISampleState>, private http: Http) {
    super(analytics);
    this.category = Category.NAMELIST;

    this.store.dispatch(new nameList.InitAction());
  }

  getNames(): Observable<Array<string>> {
    return this.http.get(`${Config.IS_MOBILE_NATIVE() ? '/' : ''}assets/data.json`)
      .map(res => res.json());
  }
}
