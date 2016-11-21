import { Injector, Component } from '@angular/core';
import { Config } from '../../frameworks/core/index';

@Component({
  selector: 'sd-about',
  templateUrl: './app/components/about/about.component.html',
  styleUrls: ['./app/components/about/about.component.css']
})
export class AboutComponent {

  // Just one way you could handle the {N} `ui/page` Page class
  // in a shared component...
  private _page: any;
  private get page() {
    if (Config.PageClass) {
      if (!this._page) {
        this._page = this.injector.get(Config.PageClass);
      }

      return this._page;
    }
  }

  constructor(private injector: Injector) {
    // This is here as an example
    // if (this.page) {
    //   this.page.actionBarHidden = true;
    // }
  }
}
