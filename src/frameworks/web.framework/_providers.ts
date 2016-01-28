import {provide} from 'angular2/core';
import {Console} from '../app.framework/core/services/console.service';
import {Window} from './core/interfaces/iwindow';

export const COMMON_WEB_PROVIDERS: any[] = [
  provide(Console, { useValue: console }),
  provide(Window, { useValue: window })
];
