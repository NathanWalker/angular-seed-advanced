import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

import {t, TEST_COMPONENT_PROVIDERS, TEST_MULTILINGUAL_RESET} from '../../test.framework/index';
import {ILang} from '../../core.framework/index';
import {LangSwitcherComponent, MultilingualService} from '../index';

const SUPPORTED_LANGUAGES: Array<ILang> = [
  { code: 'en', title: 'English' },
  { code: 'es', title: 'Spanish' },
  { code: 'fr', title: 'French' },
  { code: 'ru', title: 'Russian' },
  { code: 'bg', title: 'Bulgarian' }
];

export function main() {
  t.describe('i18n.framework: @Component: LangSwitcherComponent', () => {
 
    t.bep(() => TEST_COMPONENT_PROVIDERS({http: true, state: true, router: { primary: TestComponent }}));
    
    t.it('should work',
      t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then(rootTC => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.children[0].nativeElement;
            t.e(getDOM().querySelectorAll(appDOMEl, 'form > select option').length).toBe(1);
            t.e(getDOM().querySelectorAll(appDOMEl, 'form > select option')[0].value).toBe('en');
          });
      }));
  });
  
  t.describe('i18n.framework: @Component: LangSwitcherComponent with multiple languages', () => {
    t.be(() => MultilingualService.SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES);
    t.bep(() => TEST_COMPONENT_PROVIDERS({http: true, state: true, router: { primary: TestComponent }}));
    
    t.it('should work',
      t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
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
      }));

    // ensure statics are reset when the test had modified statics in a beforeEach (be) or beforeEachProvider (bep)
    t.ae(() => TEST_MULTILINGUAL_RESET());    
  });
}

@Component({
  selector: 'test-cmp',
  template: '<div><lang-switcher></lang-switcher></div>',
  directives: [LangSwitcherComponent]
})
class TestComponent {}
