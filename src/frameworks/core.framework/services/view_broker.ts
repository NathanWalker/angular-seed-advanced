import {CoreConfig} from './core_config';

export class ViewBroker {
  
  public static TEMPLATE_URL(path: string) {  
    if (CoreConfig.IS_WEB()) {
      return path;
    } else if (CoreConfig.IS_MOBILE_NATIVE()) {
      // views for native should all come from ./frameworks/mobile.framework/nativescript/views
      path = path.slice(1); // remove leading '.'
      return `./frameworks/mobile.framework/nativescript/views${path}`; 
    } else if (CoreConfig.IS_MOBILE_HYBRID()) {
      return path;
    } else if (CoreConfig.IS_DESKTOP()) {
      return path;
    }
  }
}
