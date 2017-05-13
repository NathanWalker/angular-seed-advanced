// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
  API?: string;
  ENV?: string;
}

export interface IPlatforms {
  WEB: string;
  MOBILE_NATIVE: string;
  MOBILE_HYBRID: string;
  DESKTOP: string;
}

export class Config {

  public static PageClass: any;


  public static DEBUG = {
    LEVEL_1: false, // .info only
    LEVEL_2: false, // .warn only
    LEVEL_3: false, // .error only
    LEVEL_4: false  // .log + all the above
  };

  // supported platforms
  public static PLATFORMS: IPlatforms = {
    WEB: 'web',
    MOBILE_NATIVE: 'mobile_native',
    MOBILE_HYBRID: 'mobile_hybrid',
    DESKTOP: 'desktop'
  };

  // current target (defaults to web)
  public static PLATFORM_TARGET: string = Config.PLATFORMS.WEB;

  // convenient platform checks
  public static IS_WEB(): boolean {
    return Config.PLATFORM_TARGET === Config.PLATFORMS.WEB;
  }

  public static IS_MOBILE_NATIVE(): boolean {
    return Config.PLATFORM_TARGET === Config.PLATFORMS.MOBILE_NATIVE;
  }

  public static IS_MOBILE_HYBRID(): boolean {
    return Config.PLATFORM_TARGET === Config.PLATFORMS.MOBILE_HYBRID;
  }

  public static IS_DESKTOP(): boolean {
    return Config.PLATFORM_TARGET === Config.PLATFORMS.DESKTOP;
  }

  public static ENVIRONMENT(): EnvConfig {
    try {
      return JSON.parse('<%= ENV_CONFIG %>');
    } catch (exp) {
      return {};
    }
  }

  // supported languages
  public static GET_SUPPORTED_LANGUAGES() {
    return [
      { code: 'en', title: 'English' },
      { code: 'es', title: 'Spanish' },
      { code: 'fr', title: 'French' },
      { code: 'ru', title: 'Russian' },
      { code: 'bg', title: 'Bulgarian' }
    ];
  }

  public static IS_DEBUG_MODE(): boolean {
    for (let key in Config.DEBUG) {
      if (Config.DEBUG[key]) {
        // if any level is on, debug mode is on
        return true;
      }
    }
    return false;
  }

  // reset debug defaults
  public static RESET() {
    for (let key in Config.DEBUG) {
      Config.DEBUG[key] = false;
    }
  }
}
