// angular
import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';

// module
import { IRouterExtensions, ExtendedNavigationExtras } from '../../services';

@Injectable()
export class RouterExtensionsMock implements IRouterExtensions {
  navigate(commands: Array<any>, extras?: ExtendedNavigationExtras): Promise<boolean> {
    return Promise.resolve(true);
  }

  navigateByUrl(url: string | UrlTree, options?: ExtendedNavigationExtras): Promise<boolean> {
    return Promise.resolve(true);
  }

  back(): void {
    return;
  }
}
