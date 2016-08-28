import {TestComponentBuilder, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

// libs
import {provideStore} from '@ngrx/store';
import {TranslateModule} from 'ng2-translate/ng2-translate';

import {t} from '../../frameworks/test/index';
import {TEST_CORE_PROVIDERS, TEST_HTTP_PROVIDERS, TEST_ROUTER_PROVIDERS} from '../../frameworks/core/testing/index';
import {NameListService, nameListReducer} from '../../frameworks/sample/index';
import {TEST_MULTILINGUAL_PROVIDERS} from '../../frameworks/i18n/testing/index';
import {HomeComponent} from './home.component';

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [FormsModule, RouterModule, TranslateModule.forRoot()]
  });
};

export function main() {
  t.describe('@Component: HomeComponent', () => {

    t.be(testModuleConfig);

    t.it('should work',
      t.async(t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {

            rootTC.detectChanges();

            let homeInstance = rootTC.debugElement.children[0].componentInstance;
            let homeDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(homeInstance.nameListService).toEqual(jasmine.any(NameListService));
            expect(getDOM().querySelectorAll(homeDOMEl, 'li').length).toEqual(0);

            homeInstance.newName = 'Minko';
            homeInstance.addName();

            rootTC.detectChanges();

            expect(getDOM().querySelectorAll(homeDOMEl, 'li').length).toEqual(1);
            expect(getDOM().querySelectorAll(homeDOMEl, 'li')[0].textContent).toEqual('Minko');
          });
      })));
  });
}

@Component({
  providers: [
    TEST_CORE_PROVIDERS(),
    TEST_HTTP_PROVIDERS(),
    TEST_ROUTER_PROVIDERS(),
    provideStore({ names: nameListReducer }),
    NameListService,
    TEST_MULTILINGUAL_PROVIDERS()
  ],
  selector: 'test-cmp',
  directives: [HomeComponent],
  template: '<sd-home></sd-home>'
})
class TestComponent {

}
