// app
import {BaseComponent, Log} from '../../frameworks/core.framework/index';
import {LangSwitcherCmp} from '../../frameworks/i18n.framework/index';

@BaseComponent({
  selector: 'sd-toolbar',
  templateUrl: './components/app/toolbar.html',
  styleUrls: ['./components/app/toolbar.css'],
  directives: [LangSwitcherCmp]
})
export class ToolbarCmp {
  
  constructor(public log: Log) { }
  
  public openLanguages(e: any): void {
    this.log.o('openLanguages');
  }
}
