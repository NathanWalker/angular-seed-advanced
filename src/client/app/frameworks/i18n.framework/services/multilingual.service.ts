// angular
import {Injectable} from '@angular/core';

// libs
import * as _ from 'lodash';
import {Store, ActionReducer, Action} from '@ngrx/store';
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {Analytics, AnalyticsService} from '../../analytics.framework/index';
import {WindowService, ILang, LocalForageService} from '../../core.framework/index';

// analytics
const CATEGORY: string = 'Multilingual';

/**
 * ngrx start --
 */
export interface MultilingualStateI {
  lang?: string;
}

export const MULTILINGUAL_ACTIONS: any = {
  LANG_CHANGE: `[${CATEGORY}] LANG_CHANGE`
};

export const multilingualReducer: ActionReducer<MultilingualStateI> = (state: MultilingualStateI = {}, action: Action) => {
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

  // default language
  public static DEFAULT_LANGUAGE: string = 'en';

  // default supported languages
  // see main.ts bootstrap for example of how to provide different value
  public static SUPPORTED_LANGUAGES: Array<ILang> = [
    { code: 'en', title: 'English' }
  ];

  // helper method to determine if lang is valid
  private static isValidLang(lang: string): boolean {
    return _.includes(_.map(MultilingualService.SUPPORTED_LANGUAGES, 'code'), lang);
  }

  constructor(public analytics: AnalyticsService, private translate: TranslateService, private win: WindowService, private store: Store<any>, private localForage: LocalForageService) {
    super(analytics);
    this.category = CATEGORY;


    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(MultilingualService.DEFAULT_LANGUAGE);

    // subscribe to changes
    store.select('i18n').subscribe((state: MultilingualStateI) => {
      // update ng2-translate which will cause translations to occur wherever the TranslatePipe is used in the view
      this.translate.use(state.lang || MultilingualService.DEFAULT_LANGUAGE);
    });

    /**
     * Determine current language to use, based on the following rules:
     * 1. Check local storage
     * 2. Check browser locale
     * 3. Use default language
     */
    localForage.instance().getItem('i18n').then((lang: string) => {
      if (!MultilingualService.isValidLang(lang)) {
        let browserLocale = win.navigator.language.split('-')[0];
        if (MultilingualService.isValidLang(browserLocale)) {
          lang = browserLocale;
        } else {
          lang = MultilingualService.DEFAULT_LANGUAGE;
        }
      }
      this.changeLang(lang);
    });
  }

  /**
   * Change the current language of the app
   * @param lang
   * @param persist -- should only be true if user requested the language change (not app default or browser locale)
     */
  public changeLang(lang: string, persist: boolean = false) {
    if (MultilingualService.isValidLang(lang)) {
      // only if lang supported
      this.track(MULTILINGUAL_ACTIONS.LANG_CHANGE, { label: lang });
      if (persist) {
        this.localForage.instance().setItem('i18n', lang);
      }
      this.store.dispatch({ type: MULTILINGUAL_ACTIONS.LANG_CHANGE, payload: { lang } });
    }
  }
}
