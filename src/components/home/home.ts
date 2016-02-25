import {BaseComponent} from '../../frameworks/core.framework/index';

@BaseComponent({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css']
})
export class HomeCmp {
  public newName: string = '';
  constructor(public nameList: NameList) { }
  
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
