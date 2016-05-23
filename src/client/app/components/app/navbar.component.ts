// libs
import {Store} from '@ngrx/store';
import {RouterState} from 'ngrx-store-router';
import {UIROUTER_DIRECTIVES} from 'ui-router-ng2';

// app
import {AppStoreI} from '../../frameworks/app.framework/index';
import {RouteComponent} from '../../frameworks/core.framework/index';

@RouteComponent({
  selector: 'sd-navbar',
  directives: [UIROUTER_DIRECTIVES],
  templateUrl: './app/components/app/navbar.component.html',
  styleUrls: ['./app/components/app/navbar.component.css']
})
export class NavbarComponent {
  // TODO: remove when {N} router supports active states
  public activeLink: any = {
    home: true,
    about: false
  };
  
  constructor(public store: Store<AppStoreI>) {  
    store.select('router').subscribe((router: RouterState) => {
      if (!router.navigating) {
        switch (router.url) {
          case '':
            this.activeLink.home = true;
            this.activeLink.about = false;
            break;
          case '/about':
            this.activeLink.home = false;
            this.activeLink.about = true;
            break;
        }
      }
    });
  }
}
