import {Config} from '../services/config.service';
import {DecoratorUtils} from './utils';

export function RouteComponent(metadata: any={}) {
  return function(cls: any) {
    return DecoratorUtils.annotateComponent(cls, metadata, {
      directives: Config.ROUTER_DIRECTIVES
    });
  };
}
