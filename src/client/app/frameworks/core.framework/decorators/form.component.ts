import {DecoratorUtils} from './utils';

import {FORM_DIRECTIVES} from '@angular/common';

export function FormComponent(metadata: any={}) {
  return function(cls: any) {
    return DecoratorUtils.annotateComponent(cls, metadata, {
      directives: FORM_DIRECTIVES
    });
  };
}
