import {Store} from '@ngrx/store';

import {RouteComponent, LogService, IRoute} from '../../frameworks/core.framework/index';

@RouteComponent({
  selector: 'sd-navbar',
  templateUrl: './components/app/navbar.component.html',
  styleUrls: ['./components/app/navbar.component.css']
})
export class NavbarComponent {
  // TODO: this is a hack to get {N} active route links to work
  public activeLink: any = {
    home: true,
    about: false
  };
  
  constructor(public log: LogService, public store: Store<any>) {  
    store.select('routes').subscribe((routeState: IRoute) => {
      if (!routeState.isChanging) {
        switch (routeState.name) {
          case 'home':
            this.activeLink.home = true;
            this.activeLink.about = false;
            break;
          case 'about':
            this.activeLink.home = false;
            this.activeLink.about = true;
            break;
        }
      }
    });
  }
}
