import {TranslateService} from 'ng2-translate/ng2-translate';

import {Log} from './core/services/log.service';
import {Multilingual} from './i18n/services/multilingual.service';

export const APP_PROVIDERS: any[] = [
  Log,
  Multilingual,
  TranslateService
];
