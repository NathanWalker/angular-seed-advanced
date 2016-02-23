import {AppConfig} from './app_config';

export class ViewBroker {
  
  public static TEMPLATE_URL(path: string) {  
    if (AppConfig.PLATFORM_TARGET === AppConfig.PLATFORMS.WEB) {
      return path;
    } else if (AppConfig.PLATFORM_TARGET === AppConfig.PLATFORMS.MOBILE_NATIVE) {
      if (path.indexOf('./frameworks/mobile.framework/native') > -1) {
        // view ready
        // multitple imports across different modules can cause the view to have already been brokered
        return path;
      } else {
        // views for native should all come from ./frameworks/mobile.framework/native
        path = path.slice(1); // remove leading '.'
        return `./frameworks/mobile.framework/native${path}`; 
      } 
    } else if (AppConfig.PLATFORM_TARGET === AppConfig.PLATFORMS.MOBILE_HYBRID) {
      return path;
    } else if (AppConfig.PLATFORM_TARGET === AppConfig.PLATFORMS.DESKTOP) {
      return path;
    }
  }
}
