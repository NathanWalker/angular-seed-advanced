import {TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {t, TEST_COMPONENT_PROVIDERS} from '../../frameworks/test.framework/index';
<<<<<<< 1e98c28970362ac1d28e5289724af04ac4eb2eec:src/components/about/about.spec.ts
import {NameList} from '../../frameworks/app.framework/index';
import {AboutCmp} from './about';
=======
import {AboutComponent} from './about.component';
>>>>>>> refactor: angular2-style-guide compliance:src/components/about/about.component.spec.ts

export function main() {
  t.describe('@Component: AboutComponent', () => {
    t.bep(() => TEST_COMPONENT_PROVIDERS({http: true}));
    
    t.it('should work',
      t.injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then(rootTC => {
            rootTC.detectChanges();

            let aboutInstance = rootTC.debugElement.children[0].componentInstance;
            let aboutDOMEl = rootTC.debugElement.children[0].nativeElement;
            let nameListLen = function () {
              return aboutInstance.list.names.length;
            };

            t.e(aboutInstance.list).toEqual(jasmine.any(NameList));
            t.e(nameListLen()).toEqual(4);
            t.e(DOM.querySelectorAll(aboutDOMEl, 'li').length).toEqual(nameListLen());

            aboutInstance.newName = 'Minko';
            aboutInstance.addName();
            rootTC.detectChanges();

            t.e(nameListLen()).toEqual(5);
            t.e(DOM.querySelectorAll(aboutDOMEl, 'li').length).toEqual(nameListLen());

            t.e(DOM.querySelectorAll(aboutDOMEl, 'li')[4].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  providers: [NameList],
  selector: 'test-cmp',
<<<<<<< 1e98c28970362ac1d28e5289724af04ac4eb2eec:src/components/about/about.spec.ts
  template: '<about></about>',
  directives: [AboutCmp]
=======
  template: '<sd-about></sd-about>',
  directives: [AboutComponent]
>>>>>>> refactor: angular2-style-guide compliance:src/components/about/about.component.spec.ts
})
class TestComponent {}
