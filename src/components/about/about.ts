import {Form} from '../../frameworks/app.framework/core/decorators/form.component';
import {NameList} from '../../frameworks/app.framework/scientists/services/name-list';

@Form({
  selector: 'about',
  templateUrl: './components/about/about.html'
})
export class AboutCmp {
  newName: string;
  constructor(public list: NameList) {}
 /*
 * @param newname  any text as input.
 * @returns return false to prevent default form submit behavior to refresh the page.
 */
  addName(): boolean {
    this.list.add(this.newName);
    this.newName = '';
    return false;
  }
}
