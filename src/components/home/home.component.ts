// libs
import {Store} from '@ngrx/store';

// app
import {FormComponent, RouteCommon} from '../../frameworks/core.framework/index';
import {IScientist, ScientistsActions} from '../../frameworks/app.framework/index';

@FormComponent({
  selector: 'sd-home',
  templateUrl: './components/home/home.component.html',
  styleUrls: ['./components/home/home.component.css']
})
export class HomeComponent extends RouteCommon {
  public names: Array<string>;
  public newName: string = '';
  constructor(private store: Store<any>, private actions: ScientistsActions) { 
    super(store);
    this.routeDesc = {
      name: 'home',
      title: 'Home'
    };
    store.select('scientists').subscribe((state: IScientist) => {
      this.names = state.names;
    });
  }
  
  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.actions.add(this.newName);
    this.newName = '';
    return false;
  }
}
