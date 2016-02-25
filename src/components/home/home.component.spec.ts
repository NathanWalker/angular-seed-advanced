import {TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {t, TEST_COMPONENT_PROVIDERS} from '../../frameworks/test.framework/index';
<<<<<<< 1e98c28970362ac1d28e5289724af04ac4eb2eec:src/components/home/home.spec.ts
import {HomeCmp} from './home';
=======
import {NameListService} from '../../frameworks/app.framework/index';
import {HomeComponent} from './home.component';
>>>>>>> refactor: angular2-style-guide compliance:src/components/home/home.component.spec.ts

export function main() {
  t.describe('@Component: HomeComponent', () => {
    
    t.bep(() => TEST_COMPONENT_PROVIDERS({ http: true }));
    
    t.it('should work',
      t.injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then((rootTC) => {
            let homeDOMEl = rootTC.debugElement.children[0].nativeElement;
<<<<<<< 1e98c28970362ac1d28e5289724af04ac4eb2eec:src/components/home/home.spec.ts
=======
            let nameListLen = function () {
              return homeInstance.nameList.names.length;
            };

            expect(homeInstance.nameList).toEqual(jasmine.any(NameListService));
            expect(nameListLen()).toEqual(4);
            expect(DOM.querySelectorAll(homeDOMEl, 'li').length).toEqual(nameListLen());

            homeInstance.newName = 'Minko';
            homeInstance.addName();
            rootTC.detectChanges();

            expect(nameListLen()).toEqual(5);
            expect(DOM.querySelectorAll(homeDOMEl, 'li').length).toEqual(nameListLen());
>>>>>>> refactor: angular2-style-guide compliance:src/components/home/home.component.spec.ts

            t.e(DOM.querySelectorAll(homeDOMEl, 'h2')[0].tagName).toEqual('H2');
            t.e(DOM.querySelectorAll(homeDOMEl, 'p')[0].className).toEqual('note');
          });
      }));
  });
}

@Component({
<<<<<<< 1e98c28970362ac1d28e5289724af04ac4eb2eec:src/components/home/home.spec.ts
  selector: 'test-cmp',
  directives: [HomeCmp],
  template: '<home></home>'
=======
  providers: [NameListService],
  selector: 'test-cmp',
  directives: [HomeComponent],
  template: '<sd-home></sd-home>'
>>>>>>> refactor: angular2-style-guide compliance:src/components/home/home.component.spec.ts
})
class TestComponent {}
