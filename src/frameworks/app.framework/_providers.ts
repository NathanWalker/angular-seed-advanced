import {TranslateService} from 'ng2-translate/ng2-translate';

import {Log} from './core/services/log';
import {Multilingual} from './i18n/services/multilingual';

export const APP_PROVIDERS: any[] = [
  Log,
  Multilingual,
  TranslateService
];
