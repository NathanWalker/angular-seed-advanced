import {OnActivate, ComponentInstruction} from 'angular2/router';

import {FormComponent, StateService} from '../../frameworks/core.framework/index';
import {NameListService} from '../../frameworks/app.framework/index';

@FormComponent({
  selector: 'sd-home',
  templateUrl: './components/home/home.component.html',
  styleUrls: ['./components/home/home.component.css']
})
export class HomeComponent implements OnActivate {
  public newName: string = '';
  constructor(public nameList: NameListService, private state: StateService) { }
  
  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.nameList.add(this.newName);
    this.newName = '';
    return false;
  }
  
  routerOnActivate(nextInstruction: ComponentInstruction, prevInstruction: ComponentInstruction): any {
    this.state.routeActivated('Home');
  }
}
