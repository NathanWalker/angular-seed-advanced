import {Component} from 'angular2/core';
import {LangSwitcherCmp} from '../../frameworks/i18n.framework/index';

@Component({
  selector: 'sd-toolbar',
  templateUrl: './components/app/toolbar.html',
  styleUrls: ['./components/app/toolbar.css'],
  directives: [LangSwitcherCmp]
})
export class ToolbarCmp {}
