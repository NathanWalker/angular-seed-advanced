import {TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {t, TEST_COMPONENT_PROVIDERS} from '../../frameworks/test.framework/index';
import {NameListService, ScientistsActions} from '../../frameworks/app.framework/index';
import {HomeComponent} from './home.component';

export function main() {
  t.describe('@Component: HomeComponent', () => {
    
    t.bep(() => {
      return [
        NameListService,
        TEST_COMPONENT_PROVIDERS({
          http: true,
          state: true
        }),
        ScientistsActions
      ];
    });
    
    t.xit('should work',
      t.injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then((rootTC) => {
            rootTC.detectChanges();

            let homeInstance = rootTC.debugElement.children[0].componentInstance;
            let homeDOMEl = rootTC.debugElement.children[0].nativeElement;
            let nameListLen = function () {
              return homeInstance.nameList.names.length;
            };

            expect(homeInstance.names).toEqual(jasmine.any(NameListService));
            expect(nameListLen()).toEqual(4);
            expect(DOM.querySelectorAll(homeDOMEl, 'li').length).toEqual(nameListLen());

            homeInstance.newName = 'Minko';
            homeInstance.addName();
            rootTC.detectChanges();

            expect(nameListLen()).toEqual(5);
            expect(DOM.querySelectorAll(homeDOMEl, 'li').length).toEqual(nameListLen());

            expect(DOM.querySelectorAll(homeDOMEl, 'li')[4].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  providers: [NameListService],
  selector: 'test-cmp',
  directives: [HomeComponent],
  template: '<sd-home></sd-home>'
})
class TestComponent {}
