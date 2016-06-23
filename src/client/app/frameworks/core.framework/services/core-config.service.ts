// angular
import {ROUTER_DIRECTIVES} from '@angular/router';

interface IPlatforms {
  WEB: string;
  MOBILE_NATIVE: string;
  MOBILE_HYBRID: string;
  DESKTOP: string;
}

export class CoreConfigService {
  
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
  public static PLATFORM_TARGET: string = CoreConfigService.PLATFORMS.WEB; 
  
  // convenient platform checks
  public static IS_WEB(): boolean {
    return CoreConfigService.PLATFORM_TARGET === CoreConfigService.PLATFORMS.WEB;
  }
  
  public static IS_MOBILE_NATIVE(): boolean {
    return CoreConfigService.PLATFORM_TARGET === CoreConfigService.PLATFORMS.MOBILE_NATIVE;
  }
  
  public static IS_MOBILE_HYBRID(): boolean {
    return CoreConfigService.PLATFORM_TARGET === CoreConfigService.PLATFORMS.MOBILE_HYBRID;
  }
  
  public static IS_DESKTOP(): boolean {
    return CoreConfigService.PLATFORM_TARGET === CoreConfigService.PLATFORMS.DESKTOP;
  }
  
  public static IS_DEBUG_MODE(): boolean {
    for (let key in CoreConfigService.DEBUG) {
      if (CoreConfigService.DEBUG[key]) {
        // if any level is on, debug mode is on
        return true;
      }
    }
    return false;
  }    
  
  // reset debug defaults
  public static RESET() {
    for (let key in CoreConfigService.DEBUG) {
      CoreConfigService.DEBUG[key] = false; 
    }
  }
}
