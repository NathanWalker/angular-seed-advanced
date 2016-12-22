// libs
import { Store } from '@ngrx/store';

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
export class LangSwitcherComponent {
  public lang: string;
  public supportedLanguages: Array<ILang>;

  constructor(public multilang: multilingual.MultilingualService,
              private log: LogService,
              private store: Store<IAppState>) {
    store.take(1).subscribe((s: any) => {
      // s && s.18n - ensures testing works in all cases (since some tests dont use i18n state)
      this.lang = s && s.i18n ? s.i18n.lang : this.multilang.defaultLanguage.code;
      this.supportedLanguages = this.multilang.availableLanguages;
    });

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
}
