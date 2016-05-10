import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

// libs 
import {provideStore} from '@ngrx/store';

import {t, TEST_COMPONENT_PROVIDERS} from '../../frameworks/test.framework/index';
import {NameListService, nameListReducer} from '../../frameworks/app.framework/index';
import {HomeComponent} from './home.component';

export function main() {
  t.describe('@Component: HomeComponent', () => {
    
    t.bep(() => {
      return [
        NameListService,
        TEST_COMPONENT_PROVIDERS({
          http: true,
          router: {
            primary: TestComponent
          }
        }),
        provideStore({names: nameListReducer})
      ];
    });
    
    t.it('should work',
      t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC:any) => {
            rootTC.detectChanges();

            let homeInstance = rootTC.debugElement.children[0].componentInstance;
            let homeDOMEl = rootTC.debugElement.children[0].nativeElement;
            // let nameListLen = function () {
            //   return homeInstance.nameListService.names.length;
            // };

            // t.e(homeInstance.names).toEqual(jasmine.any(NameListService));
            // t.e(nameListLen()).toEqual(4);
            t.e(getDOM().querySelectorAll(homeDOMEl, 'li').length).toEqual(4);

            homeInstance.newName = 'Minko';
            homeInstance.addName();
            rootTC.detectChanges();

            // t.e(nameListLen()).toEqual(5);
            t.e(getDOM().querySelectorAll(homeDOMEl, 'li').length).toEqual(5);

            t.e(getDOM().querySelectorAll(homeDOMEl, 'li')[4].textContent).toEqual('Minko');
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
