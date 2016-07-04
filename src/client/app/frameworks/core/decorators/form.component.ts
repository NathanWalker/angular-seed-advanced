import {DecoratorUtils} from './utils';

// import {FORM_DIRECTIVES} from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms/index';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';

export function FormComponent(metadata: any={}) {
  return function(cls: any) {
    return DecoratorUtils.annotateComponent(cls, metadata, {
      directives: [REACTIVE_FORM_DIRECTIVES, MdButton, MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES, MD_LIST_DIRECTIVES]
    });
  };
}
