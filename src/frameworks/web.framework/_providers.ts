import {provide} from 'angular2/core';
import {Window} from '../app.framework/core/interfaces/iwindow';
import {Console} from '../app.framework/core/services/console.service';


export const WEB_PROVIDERS: any[] = [
  provide(Window, { useValue: window }),
  provide(Console, { useValue: console })
];
