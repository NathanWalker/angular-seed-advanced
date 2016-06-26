// angular
import {Injectable} from '@angular/core';

// libs
import * as _ from 'lodash';
import {Store, ActionReducer, Action} from '@ngrx/store';
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {Analytics, AnalyticsService} from '../../analytics.framework/index';
import {WindowService, ILang} from '../../core.framework/index';

// analytics
const CATEGORY: string = 'Multilingual';

/**
 * ngrx start --
 */
export interface MultilingualStateI {
  lang: string;
}

const initialState: MultilingualStateI = {
  lang: 'en'
};

export const MULTILINGUAL_ACTIONS: any = {
  LANG_CHANGE: `[${CATEGORY}] LANG_CHANGE`
};

export const multilingualReducer: ActionReducer<MultilingualStateI> = (state: MultilingualStateI = initialState, action: Action) => {
  switch (action.type) {
    case MULTILINGUAL_ACTIONS.LANG_CHANGE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
/**
 * ngrx end --
 */

// service
@Injectable()
export class MultilingualService extends Analytics {
  
  // default supported languages
  // see main.ts bootstrap for example of how to provide different value
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
    store.select('i18n').subscribe((state: MultilingualStateI) => {
      // update ng2-translate which will cause translations to occur wherever the TranslatePipe is used in the view
      this.translate.use(state.lang);
    });
    
    // init the lang
    this.changeLang(userLang);
  }
  
  public changeLang(lang: string) {
    if (_.includes(_.map(MultilingualService.SUPPORTED_LANGUAGES, 'code'), lang)) {
      // only if lang supported
      this.track(MULTILINGUAL_ACTIONS.LANG_CHANGE, { label: lang });
      this.store.dispatch({ type: MULTILINGUAL_ACTIONS.LANG_CHANGE, payload: { lang } });
    }
  } 
}
