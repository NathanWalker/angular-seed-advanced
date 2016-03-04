// libs
import {Store} from '@ngrx/store';

// app
import {BaseComponent, RouteCommon} from '../../frameworks/core.framework/index';

@BaseComponent({
  selector: 'sd-about',
  templateUrl: './components/about/about.component.html',
  styleUrls: ['./components/about/about.component.css']
})
export class AboutComponent extends RouteCommon {
  
  constructor(private store: Store<any>) { 
    super(store);
    this.routeDesc = {
      name: 'about',
      title: 'About'
    };
  }
}
