import { Component } from '@angular/core';

// app
import { LogService } from '../../core/index';

@Component({
  selector: 'sd-toolbar',
  templateUrl: './app/frameworks/sample/components/toolbar.component.html',
  styleUrls: ['./app/frameworks/sample/components/toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private log: LogService) {}

  public openLanguages(e: any): void {
    this.log.debug('openLanguages');
  }
}
