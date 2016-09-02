import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpModule} from '@angular/http';

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
    imports: [FormsModule, RouterTestingModule, HttpModule, TranslateModule.forRoot()],
    declarations: [HomeComponent, TestComponent],
    providers: [
      TEST_CORE_PROVIDERS(),
      TEST_HTTP_PROVIDERS(),
      TEST_ROUTER_PROVIDERS(),
      provideStore({ names: nameListReducer }),
      NameListService,
      TEST_MULTILINGUAL_PROVIDERS()
    ]
  });
};

export function main() {
  t.describe('@Component: HomeComponent', () => {

    t.be(testModuleConfig);

    t.it('should work',
      t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            let homeInstance = fixture.debugElement.children[0].componentInstance;
            let homeDOMEl = fixture.debugElement.children[0].nativeElement;

            expect(homeInstance.nameListService).toEqual(jasmine.any(NameListService));
            expect(getDOM().querySelectorAll(homeDOMEl, 'li').length).toEqual(0);

            homeInstance.newName = 'Minko';
            homeInstance.addName();

            fixture.detectChanges();

            expect(getDOM().querySelectorAll(homeDOMEl, 'li').length).toEqual(1);
            expect(getDOM().querySelectorAll(homeDOMEl, 'li')[0].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-home></sd-home>'
})
class TestComponent {

}
