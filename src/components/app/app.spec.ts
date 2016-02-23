import {TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {t, TEST_COMPONENT_PROVIDERS} from '../../frameworks/test.framework/index';
import {AppCmp} from './app';

export function main() {
  t.describe('@Component: AppCmp', () => {

    t.bep(() => TEST_COMPONENT_PROVIDERS({http: true, router: true, router_primary: AppCmp}));
    
    t.it('should work',
      t.injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then(rootTC => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.children[0].nativeElement;
            t.e(DOM.querySelectorAll(appDOMEl, 'section > nav > a')[1].href).toMatch(/http:\/\/localhost:\d+\/about/);
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<app></app>',
  directives: [AppCmp]
})
class TestComponent {}
