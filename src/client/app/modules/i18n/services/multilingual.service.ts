// angular
import { Injectable, InjectionToken } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

// app
import { Analytics, AnalyticsService } from '../../analytics/index';
import { ILang } from '../../core/index';
import { WindowService } from '../../core/services/window.service';
import { IAppState } from '../../ngrx/index';

// module
import { CATEGORY } from '../common/category.common';
import { IMultilingualState, initialState } from '../states/index';
import { ChangeAction } from '../actions/index';

// provide supported languages at runtime
export const Languages: InjectionToken<Array<ILang>> = new InjectionToken('Languages');
// optional view helper for language handling
// {N} uses this to provide specific classes to SegmentedBar view bindings
export const LanguageViewHelper: InjectionToken<Array<any>> = new InjectionToken('LanguageViewHelper');
export const LanguageProviders = [
  { provide: Languages, useValue: [] },
  { provide: LanguageViewHelper, useValue: null }
];

// service
@Injectable()
export class MultilingualService extends Analytics {

  constructor(
    public analytics: AnalyticsService,
    private translate: TranslateService,
    private win: WindowService,
    private store: Store<IAppState>
  ) {
    super(analytics);
    this.category = CATEGORY;

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(initialState.lang);

    // use browser/platform lang if available
    let userLang = win.navigator.language.split('-')[0];

    // subscribe to changes
    store.select(s => s.i18n).subscribe((state: IMultilingualState) => {
      // update ng2-translate which will cause translations to occur wherever the TranslatePipe is used in the view
      this.translate.use(state.lang);
    });

    // init the lang
    this.store.dispatch(new ChangeAction(userLang));
  }
}
