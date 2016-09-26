import { Injectable } from '@angular/core';
import { Page } from 'ui/page';

// app
import { PageWrapService } from '../../../app/frameworks/core/index';

@Injectable()
export class TNSPageWrapService extends PageWrapService {
  constructor(public page: Page) {
    super();
  }
}
