import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

import {t, TEST_COMPONENT_PROVIDERS} from '../../frameworks/test.framework/index';
import {AboutComponent} from './about.component';

export function main() {
  t.describe('@Component: AboutComponent', () => {
    t.bep(() => {
      return TEST_COMPONENT_PROVIDERS({
        http: true, 
        state: true
      });
    });
    
    t.it('should work',
      t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC:any) => {
            let aboutDOMEl = rootTC.debugElement.children[0].nativeElement;

            t.e(getDOM().querySelectorAll(aboutDOMEl, 'h2')[0].textContent).toEqual('Features');
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  directives: [AboutComponent],
  template: '<sd-about></sd-about>'
})
class TestComponent {}
