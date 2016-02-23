// libs
import {TranslateService} from 'ng2-translate/ng2-translate';

// app
import {Log} from '../core.framework/services/log';
import {Multilingual} from '../i18n.framework/services/multilingual';

export const APP_PROVIDERS: any[] = [
  Log,
  Multilingual,
  TranslateService
];

// scientists
export * from './scientists/services/name_list';
