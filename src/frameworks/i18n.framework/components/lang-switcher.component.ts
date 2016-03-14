// angular
import {ControlGroup, Control} from 'angular2/common';

// libs
import {Store} from '@ngrx/store';
// app
import {FormComponent, CoreConfigService, LogService, ILang} from '../../core.framework/index';
import {MultilingualService} from '../index';

@FormComponent({
  selector: 'lang-switcher',
  templateUrl: './frameworks/i18n.framework/components/lang-switcher.component.html'
})
export class LangSwitcherComponent {
  public langForm: ControlGroup;
  public supportedLanguages: Array<ILang> = MultilingualService.SUPPORTED_LANGUAGES;
  
  constructor(private log: LogService, private store: Store<any>, private multilang: MultilingualService) {
    this.langForm = new ControlGroup({
      lang: new Control(store.getState().i18n.lang)
    });
  }
  changeLang(e: any) {
    let lang = this.supportedLanguages[0].code; // fallback to default 'en'
    
    if (CoreConfigService.IS_MOBILE_NATIVE()) {
      if (e) {
        lang = this.supportedLanguages[e.newIndex].code;
      }
    } else {
      lang = this.langForm.value.lang;
    }
    this.log.o(`Language change: ${lang}`);
    this.multilang.changeLang(lang);
  }
}
