import {OnActivate, ComponentInstruction} from 'angular2/router';

import {BaseComponent, StateService} from '../../frameworks/core.framework/index';

@BaseComponent({
  selector: 'sd-about',
  templateUrl: './components/about/about.component.html',
  styleUrls: ['./components/about/about.component.css']
})
export class AboutComponent implements OnActivate {
  
  constructor(private state: StateService) { }
  
  routerOnActivate(nextInstruction: ComponentInstruction, prevInstruction: ComponentInstruction): any {
    this.state.routeActivated('About');
  }
}
