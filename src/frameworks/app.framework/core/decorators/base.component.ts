import {DecoratorUtils} from './utils';

export function Base(config: any={}) {
  return function(cls) {
    return DecoratorUtils.annotateComponent(cls, config);
  };
}
