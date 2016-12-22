// angular
import { OnInit, OnDestroy } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

// app
import { BaseComponent, Config, LogService, ILang } from '../../core/index';
import { IAppState } from '../../ngrx/index';
import { ElectronEventService } from '../../electron/index';
import * as multilingual from '../index';

@BaseComponent({
  moduleId: module.id,
  selector: 'lang-switcher',
  templateUrl: 'lang-switcher.component.html',
  styleUrls: ['lang-switcher.component.css']
})
export class LangSwitcherComponent implements OnInit, OnDestroy {
  public lang: string;
  public supportedLanguages: Array<ILang>;
  private _sub: Subscription;

  constructor(public multilang: multilingual.MultilingualService,
              private log: LogService,
              private store: Store<IAppState>) {

    if (Config.IS_DESKTOP()) {
      // allow electron menu to talk to component
      ElectronEventService.on('changeLang').subscribe((e: any) => {
        this.changeLang({ target: { value: e.detail.value } });
      });
    }
  }

  changeLang(e: any) {
    let lang = this.multilang.defaultLanguage.code; // fallback to default

    if (Config.IS_MOBILE_NATIVE()) {
      if (e) {
        lang = this.multilang.availableLanguages[e.newIndex].code;
      }
    } else if (e && e.target) {
      lang = e.target.value;
    }

    this.log.debug(`Language change: ${lang}`);
    this.multilang.changeLang(lang);
  }

  ngOnInit() {
    this._sub = this.store.select('i18n').subscribe((s: multilingual.IMultilingualState) => {
      if (s.lang) {
        this.lang = s.lang;
        this.supportedLanguages = this.multilang.availableLanguages;
      }
    });
  }

  ngOnDestroy() {
    if (this._sub) this._sub.unsubscribe();
  }
}
