import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, ControlGroup, Control} from 'angular2/common';

import {TranslateService} from 'ng2-translate/ng2-translate';

import {Log} from '../../core/services/log.service';
import {Multilingual} from '../services/multilingual.service';

@Component({
  selector: 'lang-switcher',
  template: `
  <form [ngFormModel]="langForm">
    Change Language: <select ngControl="lang" (change)="changeLang($event)">
      <option *ngFor="#l of supportedLanguages" [value]="l.code">{{l.label}}</option>
    </select>
  </form>
  `,
  directives: [FORM_DIRECTIVES]
})
export class LangSwitcherCmp {
  public langForm: ControlGroup;
  public supportedLanguages: Array<Object> = Multilingual.SUPPORTED_LANGUAGES;
  
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
