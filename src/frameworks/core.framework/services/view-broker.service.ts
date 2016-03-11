import {CoreConfigService} from './core-config.service';

export class ViewBrokerService {
  
  public static TEMPLATE_URL(path: string): string {  
    if (CoreConfigService.IS_WEB()) {
      return path;
    } else if (CoreConfigService.IS_MOBILE_NATIVE()) {
      // views for native should all come from ./frameworks/nativescript.framework
      path = path.slice(1); // remove leading '.'
      return `./frameworks/nativescript.framework${path}`; 
    } else if (CoreConfigService.IS_MOBILE_HYBRID()) {
      return path;
    } else if (CoreConfigService.IS_DESKTOP()) {
      return path;
    } 
    return path;
  }
}
