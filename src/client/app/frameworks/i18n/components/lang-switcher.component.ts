// libs
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/take';

// app
import {FormComponent, Config, LogService, ILang} from '../../core/index';
import {ElectronEventService} from '../../electron/index';
import {MultilingualService} from '../index';

@FormComponent({
  moduleId: module.id,
  selector: 'lang-switcher',
  templateUrl: 'lang-switcher.component.html',
  styleUrls: ['lang-switcher.component.css']
})
export class LangSwitcherComponent {
  public lang: string;
  public supportedLanguages: Array<any> = MultilingualService.SUPPORTED_LANGUAGES;

  constructor(private log: LogService, private store: Store<any>, private multilang: MultilingualService) {
    store.take(1).subscribe((s: any) => {
      // s && s.18n - ensures testing works in all cases (since some tests dont use i18n state)
      this.lang = s && s.i18n ? s.i18n.lang : '';
    });

    if (Config.IS_DESKTOP()) {
      // allow electron menu to talk to component
      ElectronEventService.on('changeLang').subscribe((e: any) => {
        this.changeLang({ target: { value: e.detail.value } });
      });
    } else if (Config.IS_MOBILE_NATIVE()) {
      // DropDown component supports Array of strings
      this.supportedLanguages = this.supportedLanguages.map(lang => lang.title);
    }
  }

  public changeLang(e: any) {
    let lang = this.supportedLanguages[0].code; // fallback to default 'en'
    let commitChange = () => {
      this.log.debug(`Language change: ${lang}`);
      this.multilang.changeLang(lang);
    }
    if (Config.IS_MOBILE_NATIVE()) {
      if (e && e.propertyName == 'selectedIndex') {
        let title = this.supportedLanguages[e.value];
        lang = MultilingualService.SUPPORTED_LANGUAGES.filter(l => l.title === title)[0].code;
        commitChange();
      }
    } else if (e && e.target) {
      lang = e.target.value;
      commitChange();
    }
  }
}
