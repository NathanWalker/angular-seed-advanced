import {Component} from 'angular2/core';

import {TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
  selector: 'home',
  templateUrl: './home/components/home.html',
  styleUrls: ['./home/components/home.css'],
  pipes: [TranslatePipe]
})
export class HomeCmp {}
