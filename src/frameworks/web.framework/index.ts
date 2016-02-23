// angular
import {provide} from 'angular2/core';

// app
import {Window, Console} from '../core.framework/index';

export const WEB_PROVIDERS: any[] = [
  provide(Window, { useValue: window }),
  provide(Console, { useValue: console })
];
