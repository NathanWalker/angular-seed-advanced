// // libs
// import {Store} from '@ngrx/store';

// // app
// import {FormComponent} from '../../frameworks/core.framework/index';
// import {NameListService} from '../../frameworks/app.framework/index';

// @FormComponent({
//   selector: 'sd-home',
//   templateUrl: './components/home/home.component.html',
//   styleUrls: ['./components/home/home.component.css']
// })
// export class HomeComponent {
//   public newName: string = '';
//   constructor(private store: Store<any>, public nameListService: NameListService) { 

//   }
  
//   /*
//    * @param newname  any text as input.
//    * @returns return false to prevent default form submit behavior to refresh the page.
//    */
//   addName(): boolean {
//     this.nameListService.add(this.newName);
//     this.newName = '';
//     return false;
//   }
// }

import {Component} from 'angular2/core';

@Component({
  selector: 'sd-home',
  templateUrl: './components/home/home.component.html'
})
export class HomeComponent {
}
