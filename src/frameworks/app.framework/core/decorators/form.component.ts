import {DecoratorUtils} from './utils';

import {FORM_DIRECTIVES} from 'angular2/common';

const DIRECTIVES: any[] = [
  FORM_DIRECTIVES
];

export function Form(config: any={}) {
  return function(cls) {
    return DecoratorUtils.annotateComponent(cls, config, {
      directives: DIRECTIVES
    });
  };
}
