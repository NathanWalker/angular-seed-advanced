import {PageComponent, PageWrapService} from '../../frameworks/core/index';

@PageComponent({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent  {
  constructor(public pagewrap: PageWrapService) {
    if (pagewrap.page) {
      pagewrap.page.actionBarHidden = true;
    }
  }
}
