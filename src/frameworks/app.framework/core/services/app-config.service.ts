import {Lang} from '../../i18n/services/multilingual.service';

interface IPlatforms {
  WEB: string;
  MOBILE_NATIVE: string;
  MOBILE_HYBRID: string;
  DESKTOP: string;
}

export class AppConfig {
  
  public static PLATFORMS: IPlatforms = {
    WEB: 'web',
    MOBILE_NATIVE: 'mobile_native',
    MOBILE_HYBRID: 'mobile_hybrid',
    DESKTOP: 'desktop'
  };
  public static PLATFORM_TARGET: string = AppConfig.PLATFORMS.WEB; 
  
  public static DEBUG: any = {
    LEVEL_1: false, // .info only
    LEVEL_2: false, // .warn only
    LEVEL_3: false, // .error only
    LEVEL_4: false  // .log + all the above
  };
  
  public static SUPPORTED_LANGUAGES: Array<Lang> = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'ru', label: 'Russian' },
    { code: 'bg', label: 'Bulgarian' }
  ];
  
  // reset defaults
  public static RESET() {
    for (let key in AppConfig.DEBUG) {
      AppConfig.DEBUG[key] = false; 
    }
  }
}
