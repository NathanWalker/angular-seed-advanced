import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Lang} from '../../i18n/services/multilingual';

interface IPlatforms {
  WEB: string;
  MOBILE_NATIVE: string;
  MOBILE_HYBRID: string;
  DESKTOP: string;
}

export class AppConfig {
  
  // supported platforms
  public static PLATFORMS: IPlatforms = {
    WEB: 'web',
    MOBILE_NATIVE: 'mobile_native',
    MOBILE_HYBRID: 'mobile_hybrid',
    DESKTOP: 'desktop'
  };
  
  // current target (defaults to web)
  public static PLATFORM_TARGET: string = AppConfig.PLATFORMS.WEB; 
  
  // allows runtime config of platform specific router directives
  public static ROUTER_DIRECTIVES: Array<any> = ROUTER_DIRECTIVES;
  
  public static DEBUG: any = {
    LEVEL_1: false, // .info only
    LEVEL_2: false, // .warn only
    LEVEL_3: false, // .error only
    LEVEL_4: false  // .log + all the above
  };
  
  public static SUPPORTED_LANGUAGES: Array<Lang> = [
    { code: 'en', title: 'English' },
    { code: 'es', title: 'Spanish' },
    { code: 'fr', title: 'French' },
    { code: 'ru', title: 'Russian' },
    { code: 'bg', title: 'Bulgarian' }
  ];
  
  // reset debug defaults
  public static RESET() {
    for (let key in AppConfig.DEBUG) {
      AppConfig.DEBUG[key] = false; 
    }
  }
}
