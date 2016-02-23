// angular
import {ControlGroup, Control} from 'angular2/common';

// libs
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {FormComponent, CoreConfig, Log, ILang} from '../../core.framework/index';
import {Multilingual} from '../index';

@FormComponent({
  selector: 'lang-switcher',
  templateUrl: './frameworks/i18n.framework/components/lang_switcher.html'
})
export class LangSwitcherCmp {
  public langForm: ControlGroup;
  public supportedLanguages: Array<ILang> = Multilingual.SUPPORTED_LANGUAGES;
  
  constructor(private translate: TranslateService, private multilang: Multilingual, private log: Log) {
    this.langForm = new ControlGroup({
      lang: new Control(multilang.getLang())
    });
  }
  changeLang(e) {
    let lang = this.supportedLanguages[0].code; // fallback to default 'en'
    
    if (CoreConfig.IS_MOBILE_NATIVE()) {
      if (e) {
        lang = this.supportedLanguages[e.newIndex].code;
      }
    } else {
      lang = this.langForm.value.lang;
    }
    this.log.o(`Language change: ${lang}`);
    this.translate.use(lang);
  }
}
