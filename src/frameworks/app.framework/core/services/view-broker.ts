import {AppConfig} from './app-config';

export class ViewBroker {
  
  public static TEMPLATE_URL(path: string) {  
    if (AppConfig.PLATFORM_TARGET === AppConfig.PLATFORMS.WEB) {
      return path;
    } else if (AppConfig.PLATFORM_TARGET === AppConfig.PLATFORMS.MOBILE_NATIVE) {
      let parts = path.split('.');
      return `./frameworks/mobile.framework/native${parts[1]}.html`; // {N} doesn't support xml as templateUrl afaik
    } else if (AppConfig.PLATFORM_TARGET === AppConfig.PLATFORMS.MOBILE_HYBRID) {
      return path;
    } else if (AppConfig.PLATFORM_TARGET === AppConfig.PLATFORMS.DESKTOP) {
      return path;
    }
  }
}
