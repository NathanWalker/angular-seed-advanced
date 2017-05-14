import { Component } from '@angular/core';

// app
import { LogService } from '../../../core/services/logging/log.service';

@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: [
    'toolbar.component.css',
  ],
})
export class ToolbarComponent {

  constructor(private log: LogService) {}

  public openLanguages(e: any): void {
    this.log.debug('openLanguages');
  }
}
