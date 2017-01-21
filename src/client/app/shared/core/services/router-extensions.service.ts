// angular
import { Injectable } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { Router, UrlTree, NavigationExtras } from '@angular/router';

export interface ExtendedNavigationExtras extends NavigationExtras {
  // Options for nativescript
  clearHistory?: boolean;
  animated?: boolean;
  transition?: { // See -> https://docs.nativescript.org/api-reference/interfaces/_ui_frame_.navigationtransition.html
    name?: string;
    instance?: any;
    duration?: number;
    curve?: any;
  };
  // END - Options for nativescript
}

export interface IRouterExtensions {
  navigate(commands: Array<any>, extras?: ExtendedNavigationExtras): Promise<boolean>;
  navigateByUrl(url: string | UrlTree, options?: ExtendedNavigationExtras): Promise<boolean>;
  back(): void;
}

@Injectable()
export class RouterExtensions implements IRouterExtensions {

  constructor(public router: Router, private locationStrategy: LocationStrategy) { }

  public navigate(commands: Array<any>, extras?: ExtendedNavigationExtras): Promise<boolean> {
    return this.router.navigate(commands, extras);
  }

  public navigateByUrl(url: string | UrlTree, options?: ExtendedNavigationExtras): Promise<boolean> {
    return this.router.navigateByUrl(url);
  }

  public back() {
    this.locationStrategy.back();
  }
}
