import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

// libs
import {provideStore} from '@ngrx/store';

import {t} from '../../test/index';
import {ILang} from '../../core/index';
import {TEST_CORE_PROVIDERS, TEST_HTTP_PROVIDERS, TEST_ROUTER_PROVIDERS} from '../../core/testing/index';
import {LangSwitcherComponent, MultilingualService, multilingualReducer} from '../index';
import {TEST_MULTILINGUAL_PROVIDERS, TEST_MULTILINGUAL_RESET} from '../testing/index';

const SUPPORTED_LANGUAGES: Array<ILang> = [
  { code: 'en', title: 'English' },
  { code: 'es', title: 'Spanish' },
  { code: 'fr', title: 'French' },
  { code: 'ru', title: 'Russian' },
  { code: 'bg', title: 'Bulgarian' }
];

export function main() {
  t.describe('i18n:', () => {
    t.describe('@Component: LangSwitcherComponent', () => {
      t.bep(() => [
        TEST_CORE_PROVIDERS(),
        TEST_HTTP_PROVIDERS(),
        TEST_ROUTER_PROVIDERS(),
        TEST_MULTILINGUAL_PROVIDERS(),
        provideStore({ i18n: multilingualReducer })
      ]);
      
      t.it('should work',
        t.fakeAsync(t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
          return tcb.createAsync(TestComponent)
            .then(rootTC => {
              rootTC.detectChanges();
              let appDOMEl = rootTC.debugElement.children[0].nativeElement;
              t.e(getDOM().querySelectorAll(appDOMEl, 'form > select option').length).toBe(1);
              t.e(getDOM().querySelectorAll(appDOMEl, 'form > select option')[0].value).toBe('en');
            });
        })));
    });
    
    t.describe('@Component: LangSwitcherComponent with multiple languages', () => {
      t.be(() => MultilingualService.SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES);
      t.bep(() => [
        TEST_CORE_PROVIDERS(),
        TEST_HTTP_PROVIDERS(),
        TEST_ROUTER_PROVIDERS(),
        TEST_MULTILINGUAL_PROVIDERS(),
        provideStore({ i18n: multilingualReducer })
      ]);

      // ensure statics are reset when the test had modified statics in a beforeEach (be) or beforeEachProvider (bep)
      t.ae(() => TEST_MULTILINGUAL_RESET());   
      
      t.it('should work',
        t.fakeAsync(t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
          return tcb.createAsync(TestComponent)
            .then(rootTC => {
              rootTC.detectChanges();
              let appDOMEl = rootTC.debugElement.children[0].nativeElement;
              t.e(getDOM().querySelectorAll(appDOMEl, 'form > select option').length).toBe(5);
              t.e(getDOM().querySelectorAll(appDOMEl, 'form > select option')[0].value).toBe('en');
              t.e(getDOM().querySelectorAll(appDOMEl, 'form > select option')[1].value).toBe('es');
              t.e(getDOM().querySelectorAll(appDOMEl, 'form > select option')[2].value).toBe('fr');
              t.e(getDOM().querySelectorAll(appDOMEl, 'form > select option')[3].value).toBe('ru');
              t.e(getDOM().querySelectorAll(appDOMEl, 'form > select option')[4].value).toBe('bg');
            });
        }))); 
    });
  });
}

@Component({
  selector: 'test-cmp',
  template: '<div><lang-switcher></lang-switcher></div>',
  directives: [LangSwitcherComponent]
})
class TestComponent {}
