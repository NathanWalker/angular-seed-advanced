import {DecoratorUtils} from './utils';

export function BaseComponent(config: any={}) {
  return function(cls: any) {
    return DecoratorUtils.annotateComponent(cls, config);
  };
}
