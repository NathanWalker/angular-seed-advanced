// angular
import { Injectable } from '@angular/core';

// libs
import { Store, ActionReducer, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { TranslateService } from 'ng2-translate';
import { includes, map } from 'lodash';

// app
import { Analytics, AnalyticsService } from '../../analytics/index';
import { WindowService, ILang } from '../../core/index';

// analytics
const CATEGORY: string = 'Multilingual';

/**
 * ngrx start --
 */
export interface IMultilingualState {
  lang: string;
}

const initialState: IMultilingualState = {
  lang: 'en'
};

interface IMultilingualActions {
  CHANGE: string;
  LANG_CHANGED: string;
  LANG_UNSUPPORTED: string;
}

export const MULTILINGUAL_ACTIONS: IMultilingualActions = {
  CHANGE: `${CATEGORY}_CHANGE`,
  LANG_CHANGED: `${CATEGORY}_LANG_CHANGED`,
  LANG_UNSUPPORTED: `${CATEGORY}_LANG_UNSUPPORTED`
};

export function multilingualReducerFn(state: IMultilingualState = initialState, action: Action) {
  switch (action.type) {
    case MULTILINGUAL_ACTIONS.LANG_CHANGED:
      return (<any>Object).assign({}, state, { lang: action.payload });
    default:
      return state;
  }
};

export const multilingualReducer: ActionReducer<IMultilingualState> = multilingualReducerFn;
/**
 * ngrx end --
 */

// service
@Injectable()
export class MultilingualService extends Analytics {

  // default supported languages
  // see web.module.ts for example of how to provide different value
  public static SUPPORTED_LANGUAGES: Array<ILang> = [
    { code: 'en', title: 'English' }
  ];

  constructor(public analytics: AnalyticsService, private translate: TranslateService, private win: WindowService, private store: Store<any>) {
    super(analytics);
    this.category = CATEGORY;

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // use browser/platform lang if available
    let userLang = win.navigator.language.split('-')[0];

    // subscribe to changes
    store.select('i18n').subscribe((state: IMultilingualState) => {
      // update ng2-translate which will cause translations to occur wherever the TranslatePipe is used in the view

      this.translate.use(state.lang);
    });

    // init the lang
    this.store.dispatch({ type: MULTILINGUAL_ACTIONS.CHANGE, payload: userLang });
  }
}

@Injectable()
export class MultilingualEffects {

  @Effect() change$ = this.actions$
    .ofType(MULTILINGUAL_ACTIONS.CHANGE)
    .map(action => {
      let lang = action.payload;
      if (includes(map(MultilingualService.SUPPORTED_LANGUAGES, 'code'), lang)) {
        // track analytics
        this.multilang.track(MULTILINGUAL_ACTIONS.LANG_CHANGED, { label: lang });
        // change state
        return ({ type: MULTILINGUAL_ACTIONS.LANG_CHANGED, payload: lang });
      } else {
        // not supported (here for example)
        return ({ type: MULTILINGUAL_ACTIONS.LANG_UNSUPPORTED, payload: lang });
      }
    });

  constructor(private store: Store<any>, private actions$: Actions, private multilang: MultilingualService) { }

}
