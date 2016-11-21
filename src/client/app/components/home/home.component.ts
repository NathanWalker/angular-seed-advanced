// libs
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { RouterExtensions } from '../../frameworks/core/index';
import { NAME_LIST_ACTIONS } from '../../frameworks/sample/index';

@Component({
  selector: 'sd-home',
  templateUrl: './app/components/home/home.component.html',
  styleUrls: ['./app/components/home/home.component.css']
})
export class HomeComponent {
  public names$: Observable<any>;
  public newName: string = '';

  constructor(private store: Store<any>, public routerext: RouterExtensions) {
    this.names$ = store.select('names');
  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.store.dispatch({ type: NAME_LIST_ACTIONS.ADD, payload: this.newName });
    this.newName = '';
    return false;
  }

  readAbout() {
    // Try this in the {N} app
    // {N} can use these animation options
    this.routerext.navigate(['/about'], {
      transition: {
        duration: 1000,
        name: 'slideTop',
      }
    });
  }
}
