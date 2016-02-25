import {TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {t, TEST_COMPONENT_PROVIDERS} from '../../frameworks/test.framework/index';
import {AboutComponent} from './about.component';

export function main() {
  t.describe('@Component: AboutComponent', () => {
    t.bep(() => TEST_COMPONENT_PROVIDERS({http: true}));
    
    t.it('should work',
      t.injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then(rootTC => {
            let aboutDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(DOM.querySelectorAll(aboutDOMEl, 'h2')[0].textContent).toEqual('Features');
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-about></sd-about>',
  directives: [AboutComponent]
})
class TestComponent {}
