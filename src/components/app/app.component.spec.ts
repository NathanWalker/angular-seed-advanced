import {TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {t, TEST_COMPONENT_PROVIDERS} from '../../frameworks/test.framework/index';
import {AppComponent} from './app.component';

export function main() {
  t.describe('@Component: AppComponent', () => {

<<<<<<< 1e98c28970362ac1d28e5289724af04ac4eb2eec:src/components/app/app.spec.ts
    t.bep(() => TEST_COMPONENT_PROVIDERS({http: true, router: true, router_primary: AppCmp}));
=======
    t.bep(() => TEST_COMPONENT_PROVIDERS({ http: true, router: { primary: AppComponent } }));
>>>>>>> refactor: angular2-style-guide compliance:src/components/app/app.component.spec.ts
    
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
<<<<<<< 1e98c28970362ac1d28e5289724af04ac4eb2eec:src/components/app/app.spec.ts
  template: '<app></app>',
  directives: [AppCmp]
=======
  template: '<sd-app></sd-app>',
  directives: [AppComponent]
>>>>>>> refactor: angular2-style-guide compliance:src/components/app/app.component.spec.ts
})
class TestComponent {}
