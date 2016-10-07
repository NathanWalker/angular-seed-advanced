import { DecoratorUtils } from './utils';

export function BaseComponent(metadata: any = {}) {
  return function(cls: any) {
    return DecoratorUtils.annotateComponent(cls, metadata);
  };
}
