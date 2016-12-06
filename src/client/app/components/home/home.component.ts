// libs
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { RouterExtensions, Config } from '../../frameworks/core/index';
import { IAppState, getNames } from '../../frameworks/ngrx/index';
import * as nameList from '../../frameworks/sample/index';

declare var NSIndexPath, UITableViewScrollPosition;

@Component({
  selector: 'sd-home',
  templateUrl: './app/components/home/home.component.html',
  styleUrls: ['./app/components/home/home.component.css']
})
export class HomeComponent {
  public names$: Observable<any>;
  public newName: string = '';
  private _cnt: number = 3; // just for example purposes
  private _listview: any;

  constructor(private store: Store<IAppState>, public routerext: RouterExtensions) {
    this.names$ = store.let(getNames);
  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.store.dispatch(new nameList.AddAction(this.newName));
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
