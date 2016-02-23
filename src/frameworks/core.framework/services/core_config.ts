// angular
import {ROUTER_DIRECTIVES} from 'angular2/router';

interface IPlatforms {
  WEB: string;
  MOBILE_NATIVE: string;
  MOBILE_HYBRID: string;
  DESKTOP: string;
}

export class CoreConfig {
  
  public static DEBUG: any = {
    LEVEL_1: false, // .info only
    LEVEL_2: false, // .warn only
    LEVEL_3: false, // .error only
    LEVEL_4: false  // .log + all the above
  };
  
  // allows runtime config of platform specific router directives
  public static ROUTER_DIRECTIVES: Array<any> = ROUTER_DIRECTIVES;
  
  // supported platforms
  public static PLATFORMS: IPlatforms = {
    WEB: 'web',
    MOBILE_NATIVE: 'mobile_native',
    MOBILE_HYBRID: 'mobile_hybrid',
    DESKTOP: 'desktop'
  };
  
  // current target (defaults to web)
  public static PLATFORM_TARGET: string = CoreConfig.PLATFORMS.WEB; 
  
  // convenient platform checks
  public static IS_WEB(): boolean {
    return CoreConfig.PLATFORM_TARGET === CoreConfig.PLATFORMS.WEB;
  }
  
  public static IS_MOBILE_NATIVE(): boolean {
    return CoreConfig.PLATFORM_TARGET === CoreConfig.PLATFORMS.MOBILE_NATIVE;
  }
  
  public static IS_MOBILE_HYBRID(): boolean {
    return CoreConfig.PLATFORM_TARGET === CoreConfig.PLATFORMS.MOBILE_HYBRID;
  }
  
  public static IS_DESKTOP(): boolean {
    return CoreConfig.PLATFORM_TARGET === CoreConfig.PLATFORMS.DESKTOP;
  }
  
  // reset debug defaults
  public static RESET() {
    for (let key in CoreConfig.DEBUG) {
      CoreConfig.DEBUG[key] = false; 
    }
  }
}
