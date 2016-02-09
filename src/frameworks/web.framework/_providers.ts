import {provide} from 'angular2/core';
import {Window} from '../app.framework/core/services/window';
import {Console} from '../app.framework/core/services/console';


export const WEB_PROVIDERS: any[] = [
  provide(Window, { useValue: window }),
  provide(Console, { useValue: console })
];
