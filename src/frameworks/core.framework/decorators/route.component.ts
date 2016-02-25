import {CoreConfigService} from '../services/core-config.service';
import {DecoratorUtils} from './utils';

export function RouteComponent(config: any={}) {
  return function(cls) {
    return DecoratorUtils.annotateComponent(cls, config, {
      directives: CoreConfigService.ROUTER_DIRECTIVES
    });
  };
}
