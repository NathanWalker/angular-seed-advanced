// libs
import {Store} from '@ngrx/store';

import {FormComponent, RouteCommon, IRoute} from '../../frameworks/core.framework/index';
import {NameListService} from '../../frameworks/app.framework/index';

@FormComponent({
  selector: 'sd-home',
  templateUrl: './components/home/home.component.html',
  styleUrls: ['./components/home/home.component.css']
})
export class HomeComponent extends RouteCommon {
  public newName: string = '';
  constructor(private store: Store<any>, public nameList: NameListService) { 
    super(store);
    this.routeDesc = {
      name: 'home',
      title: 'Home'
    };
  }
  
  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.nameList.add(this.newName);
    this.newName = '';
    return false;
  }
}
