// angular
import {provide} from 'angular2/core';

// libs
import {TranslateService, TranslateLoader} from 'ng2-translate/ng2-translate';

// app
import {WindowService} from '../../core.framework/index';
import {MultilingualService, MultilingualActions} from '../../i18n.framework/index';

// mocks
import {TranslateMock} from '../mocks/ng2-translate/ng2-translate.mock';
import {TranslateLoaderMock} from '../mocks/ng2-translate/ng2-translate-loader.mock';

// i18n
export function TEST_MULTILINGUAL_PROVIDERS(options?: any): any[] {
  // options
  // service:            custom provider block
  
  let providers: Array<any> = [
    provide(TranslateLoader, { useClass: TranslateLoaderMock }),
    provide(TranslateService, { useClass: TranslateMock })
  ];
  
  if (options) {
    
    if (options.service) {
      // custom 
      providers.push(options.service);
    }
    
  } else {
    // default 
    providers.push(
      provide(MultilingualService, {
        deps: [TranslateService, WindowService],
        useFactory: (translate: TranslateService, win: WindowService) => {
          return new MultilingualService(translate, win);
        }
      })
    );
  }
  
  // actions last
  providers.push(MultilingualActions);
  
  return providers;
}
