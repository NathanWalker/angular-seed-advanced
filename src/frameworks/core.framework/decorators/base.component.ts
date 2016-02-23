import {DecoratorUtils} from './utils';

export function BaseComponent(config: any={}) {
  return function(cls) {
    return DecoratorUtils.annotateComponent(cls, config);
  };
}
