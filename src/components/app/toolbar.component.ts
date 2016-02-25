// app
import {BaseComponent, LogService} from '../../frameworks/core.framework/index';
import {LangSwitcherComponent} from '../../frameworks/i18n.framework/index';

@BaseComponent({
  selector: 'sd-toolbar',
  templateUrl: './components/app/toolbar.component.html',
  styleUrls: ['./components/app/toolbar.component.css'],
  directives: [LangSwitcherComponent]
})
export class ToolbarComponent {
  
  constructor(public log: LogService) { }
  
  public openLanguages(e: any): void {
    this.log.o('openLanguages');
  }
}
