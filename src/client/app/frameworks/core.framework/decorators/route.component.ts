import {CoreConfigService} from '../services/core-config.service';
import {DecoratorUtils} from './utils';

export function RouteComponent(metadata: any={}) {
  return function(cls: any) {
    return DecoratorUtils.annotateComponent(cls, metadata, {
      directives: CoreConfigService.ROUTER_DIRECTIVES
    });
  };
}
