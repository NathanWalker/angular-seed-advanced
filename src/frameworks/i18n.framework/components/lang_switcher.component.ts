// angular
import {ControlGroup, Control} from 'angular2/common';

// libs
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {FormComponent, Log, ViewBroker, ILang} from '../../core.framework/index';
import {Multilingual} from '../index';

@FormComponent({
  selector: 'lang-switcher',
  templateUrl: ViewBroker.TEMPLATE_URL('./frameworks/i18n.framework/components/lang_switcher.html')
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
    this.log.o(`Language change: ${this.langForm.value.lang}`);
    this.translate.use(this.langForm.value.lang);
  }
}
