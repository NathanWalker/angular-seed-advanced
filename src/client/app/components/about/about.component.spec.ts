import {TestComponentBuilder} from '@angular/core/testing';
import {Component} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

import {t} from '../../frameworks/test/index';
import {AboutComponent} from './about.component';

export function main() {
  t.describe('@Component: AboutComponent', () => {

    t.it('should work',
      t.async(t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC:any) => {
            let aboutDOMEl = rootTC.debugElement.children[0].nativeElement;

	          t.e(getDOM().querySelectorAll(aboutDOMEl, 'h2')[0].textContent).toEqual('Features');
          });
      })));
  });
}

@Component({
  selector: 'test-cmp',
  directives: [AboutComponent],
  template: '<sd-about></sd-about>'
})
class TestComponent { }
