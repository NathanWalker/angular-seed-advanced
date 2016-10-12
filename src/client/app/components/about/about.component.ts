import { Injector } from '@angular/core';
import { BaseComponent, Config } from '../../frameworks/core/index';

@BaseComponent({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent {
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
    if (this.page) {
      this.page.actionBarHidden = true;
    }
  }
}
