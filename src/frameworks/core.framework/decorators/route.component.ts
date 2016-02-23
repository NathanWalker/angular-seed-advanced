import {CoreConfig} from '../services/core_config';
import {DecoratorUtils} from './utils';

export function RouteComponent(config: any={}) {
  return function(cls) {
    return DecoratorUtils.annotateComponent(cls, config, {
      directives: CoreConfig.ROUTER_DIRECTIVES
    });
  };
}
