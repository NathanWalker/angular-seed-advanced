import {MdButton} from '@angular2-material/button';
import {DecoratorUtils} from './utils';

export function BaseComponent(metadata: any={}) {
  return function(cls: any) {
    return DecoratorUtils.annotateComponent(cls, metadata, {
      directives: [MdButton]
    });
  };
}
