import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

import {t, TEST_COMPONENT_PROVIDERS} from '../../frameworks/test.framework/index';
import {AppComponent} from './app.component';

export function main() {
  t.describe('@Component: AppComponent', () => {

    t.bep(() => {
      return TEST_COMPONENT_PROVIDERS({
        http: true,
        router: {
          primary: AppComponent
        },
        state: true
      });
    });
    
    t.it('should work',
      t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC:any) => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.children[0].nativeElement;
            t.e(getDOM().querySelectorAll(appDOMEl, 'sd-app sd-navbar > nav > a')[1].href).toMatch(/\/about/);
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  directives: [AppComponent],
  template: '<sd-app></sd-app>'
})
class TestComponent {}
