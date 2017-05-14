// libs
import { TranslateService, TranslateLoader } from '@ngx-translate/core';

// module
import { MultilingualService } from '../services/index';

// mocks
import { TranslateMock } from './mocks/ng2-translate.mock';
import { TranslateLoaderMock } from './mocks/ng2-translate-loader.mock';

export function TEST_MULTILINGUAL_PROVIDERS(): Array<any> {

  let providers: Array<any> = [
    { provide: TranslateLoader, useClass: TranslateLoaderMock },
    { provide: TranslateService, useClass: TranslateMock },
    MultilingualService
  ];

  return providers;
}

export function getLanguages(): Array<any> {
  return [
    { code: 'en', title: 'English' },
    { code: 'es', title: 'Spanish' },
    { code: 'fr', title: 'French' },
    { code: 'ru', title: 'Russian' },
    { code: 'bg', title: 'Bulgarian' }
  ];
}
