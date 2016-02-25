import {CoreConfig} from './core_config';

export class ViewBroker {
  
  public static TEMPLATE_URL(path: string) {  
    if (CoreConfig.IS_WEB()) {
      return path;
    } else if (CoreConfig.IS_MOBILE_NATIVE()) {
      // views for native should all come from ./frameworks/nativescript.framework
      path = path.slice(1); // remove leading '.'
      return `./frameworks/nativescript.framework${path}`; 
    } else if (CoreConfig.IS_MOBILE_HYBRID()) {
      return path;
    } else if (CoreConfig.IS_DESKTOP()) {
      return path;
    }
  }
}
