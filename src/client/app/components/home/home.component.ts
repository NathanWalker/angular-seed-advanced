// libs
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
export class HomeComponent implements AfterViewInit {
  @ViewChild('listview') listviewEl: ElementRef;
  public names$: Observable<Array<string>>;
  public newName: string = '';
  private _cnt: number = 3; // just for example purposes
  private _listview: any;

  constructor(private store: Store<IAppState>, public routerext: RouterExtensions) {
    this.names$ = store.let(<any>getNames);
  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.store.dispatch(new nameList.AddAction(this.newName));
    this.newName = '';
    setTimeout(() => {
      this.scrollToItem(this._cnt);
      this._cnt++;
    }, 300);
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

  ngAfterViewInit() {
    if (Config.IS_MOBILE_NATIVE()) {
      this._listview = this.listviewEl.nativeElement;
      console.log(this._listview.ios);
    }
  }

  private scrollToItem(index: number) {
    if (Config.IS_MOBILE_NATIVE()) {
      if (this._listview.ios) {
        this._listview.ios.scrollToRowAtIndexPathAtScrollPositionAnimated(
            NSIndexPath.indexPathForItemInSection(index, 0),
            UITableViewScrollPosition.UITableViewScrollPositionTop,
            true
        );
      } else {
        this._listview.scrollToIndex(index);
      }
    } else {
      // could scroll on the web if needed
    }
  }
}
