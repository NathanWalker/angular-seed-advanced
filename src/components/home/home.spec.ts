import {TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {t, TEST_COMPONENT_PROVIDERS} from '../../frameworks/test.framework/_providers';
import {HomeCmp} from './home';

export function main() {
  t.describe('@Component: HomeCmp', () => {
    
    t.bep(() => TEST_COMPONENT_PROVIDERS({ http: true }));
    
    t.it('should work',
      t.injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then((rootTC) => {
            let homeDOMEl = rootTC.debugElement.children[0].nativeElement;

            t.e(DOM.querySelectorAll(homeDOMEl, 'h2')[0].tagName).toEqual('H2');
            t.e(DOM.querySelectorAll(homeDOMEl, 'p')[0].className).toEqual('note');
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  directives: [HomeCmp],
  template: '<home></home>'
})
class TestComponent {}
