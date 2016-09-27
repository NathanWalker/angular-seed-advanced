import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';

import { IRouterExtensions, ExtendedNavigationExtras } from '../../index';

@Injectable()
export class RouterExtensionsMock implements IRouterExtensions {
  navigate(commands: any[], extras?: ExtendedNavigationExtras): Promise<boolean> {
    return Promise.resolve(true);
  }

  navigateByUrl(url: string | UrlTree, options?: ExtendedNavigationExtras): Promise<boolean> {
    return Promise.resolve(true);
  }

  back(): void {
    return;
  }
}
