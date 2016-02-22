import {AppConfig} from '../services/app-config';
import {DecoratorUtils} from './utils';

export function RouteComponent(config: any={}) {
  return function(cls) {
    return DecoratorUtils.annotateComponent(cls, config, {
      directives: AppConfig.ROUTER_DIRECTIVES
    });
  };
}
