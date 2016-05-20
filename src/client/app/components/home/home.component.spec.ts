import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

// libs 
import {provideStore} from '@ngrx/store';

import {t, TEST_COMPONENT_PROVIDERS, TEST_HTTP_PROVIDERS} from '../../frameworks/test.framework/index';
import {NameListService, nameListReducer} from '../../frameworks/app.framework/index';
import {HomeComponent} from './home.component';

export function main() {
  t.describe('@Component: HomeComponent', () => {
    
    t.it('should work',
      t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC:any) => {
            rootTC.detectChanges();

            let homeInstance = rootTC.debugElement.children[0].componentInstance;
            let homeDOMEl = rootTC.debugElement.children[0].nativeElement;

            t.e(homeInstance.nameListService).toEqual(jasmine.any(NameListService));
            t.e(getDOM().querySelectorAll(homeDOMEl, 'li').length).toEqual(0);

            homeInstance.newName = 'Minko';
            homeInstance.addName();
            rootTC.detectChanges();

            t.e(getDOM().querySelectorAll(homeDOMEl, 'li').length).toEqual(1);

            t.e(getDOM().querySelectorAll(homeDOMEl, 'li')[0].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  providers: [
    provideStore({ names: nameListReducer }),
    TEST_HTTP_PROVIDERS(),
    NameListService,
    TEST_COMPONENT_PROVIDERS({
      router: {
        primary: TestComponent
      }
    })
  ],
  selector: 'test-cmp',
  directives: [HomeComponent],
  template: '<sd-home></sd-home>'
})
class TestComponent {
  
}
