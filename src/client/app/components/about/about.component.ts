import { Inject } from '@angular/core';
import { PageComponent, PAGE } from '../../frameworks/core/index';

@PageComponent({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent  {
  constructor(@Inject(PAGE) public page: any) {
    if (page) {
      page.actionBarHidden = true;
    }
  }
}
