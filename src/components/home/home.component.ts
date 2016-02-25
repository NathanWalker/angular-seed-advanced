<<<<<<< 1e98c28970362ac1d28e5289724af04ac4eb2eec:src/components/home/home.ts
import {BaseComponent} from '../../frameworks/core.framework/index';

@BaseComponent({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css']
=======
import {FormComponent} from '../../frameworks/core.framework/index';
import {NameListService} from '../../frameworks/app.framework/index';

@FormComponent({
  selector: 'sd-home',
  templateUrl: './components/home/home.component.html',
  styleUrls: ['./components/home/home.component.css']
>>>>>>> refactor: angular2-style-guide compliance:src/components/home/home.component.ts
})
export class HomeComponent {
  public newName: string = '';
  constructor(public nameList: NameListService) { }
  
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
