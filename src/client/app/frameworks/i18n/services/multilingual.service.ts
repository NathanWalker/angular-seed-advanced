// angular
import { Injectable } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { TranslateService } from 'ng2-translate';

// app
import { Analytics, AnalyticsService } from '../../analytics/index';
import { WindowService, ILang } from '../../core/index';

// module
import { CATEGORY } from '../common/category.common';
import { IMultilingualState } from '../states/index';
import { ChangeAction } from '../actions/index';

// service
@Injectable()
export class MultilingualService extends Analytics {

  // default supported languages
  // see web.module.ts for example of how to provide different value
  // public static SUPPORTED_LANGUAGES: Array<ILang> = [
  //   { code: 'en', title: 'English' }
  // ];

  // default & available languages at instance level
  defaultLanguage: ILang;
  availableLanguages: Array<ILang>;

  constructor(
    public analytics: AnalyticsService,
    private translate: TranslateService,
    private win: WindowService,
    private store: Store<IMultilingualState>
  ) {
    super(analytics);
    this.category = CATEGORY;

    // subscribe to changes
    store.select('i18n')
      .subscribe((state: IMultilingualState) => {
        if (!!state && !!state.lang)
          // update ng2-translate which will cause translations to occur wherever the TranslatePipe is used in the view
          this.translate.use(state.lang);
    });
  }

  init(settings: any): void {
    this.defaultLanguage = settings.defaultLanguage;
    this.availableLanguages = settings.availableLanguages;

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(this.defaultLanguage.code);

    // use browser/platform lang if available
    let userLang = (this.win.navigator.language && this.win.navigator.language.split('-')[0]) || this.defaultLanguage.code;

    // init the lang
    this.store.dispatch(new ChangeAction(userLang));
  }

  changeLang(lang: string): void {
    // change the lang
    this.store.dispatch(new ChangeAction(lang));
  }
}
