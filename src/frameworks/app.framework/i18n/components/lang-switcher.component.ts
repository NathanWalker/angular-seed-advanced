import {Form} from '../../core/decorators/form.component';
import {ControlGroup, Control} from 'angular2/common';

import {TranslateService} from 'ng2-translate/ng2-translate';

import {Log} from '../../core/services/log';
import {Multilingual, Lang} from '../services/multilingual';
import {ViewBroker} from '../../core/services/view-broker';

@Form({
  selector: 'lang-switcher',
  templateUrl: ViewBroker.TEMPLATE_URL('./frameworks/app.framework/i18n/components/lang-switcher.html')
})
export class LangSwitcherCmp {
  public langForm: ControlGroup;
  public supportedLanguages: Array<Lang> = Multilingual.SUPPORTED_LANGUAGES;
  
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
