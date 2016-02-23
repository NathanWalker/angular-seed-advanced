import {DecoratorUtils} from './utils';

import {FORM_DIRECTIVES} from 'angular2/common';

export function FormComponent(config: any={}) {
  return function(cls) {
    return DecoratorUtils.annotateComponent(cls, config, {
      directives: FORM_DIRECTIVES
    });
  };
}
