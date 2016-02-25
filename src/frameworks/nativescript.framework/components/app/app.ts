import {Inject} from 'angular2/core';
import {AppCmp} from '../../../../components/app/app';
import {Log} from '../../../../frameworks/core.framework/index';
import {ActionBarUtil} from '../../index';

export class NSAppCmp extends AppCmp {
  
  constructor(@Inject(Log) private log: Log) {
    super();
    log.o('NSAppCmp ----');
    ActionBarUtil.SET_TITLE('Angular 2 Seed Advanced');
  }
}
