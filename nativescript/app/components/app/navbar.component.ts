import {RouteComponent, LogService, StateService} from '../../frameworks/core.framework/index';

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
  
  constructor(public log: LogService, public state: StateService) {  
    state.change.subscribe((msg: string) => {
      switch (msg) {
        case 'Home':
          this.activeLink.home = true;
          this.activeLink.about = false;
          break; 
        case 'About':
          this.activeLink.home = false;
          this.activeLink.about = true;
          break;
      }
    });
  }
}
