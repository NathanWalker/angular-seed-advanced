import {TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {t, TEST_COMPONENT_PROVIDERS} from '../../../../frameworks/test.framework/_providers';
import {AppConfig} from '../../core/services/app-config';
import {Multilingual} from '../services/multilingual';
import {LangSwitcherCmp} from './lang-switcher.component';

export function main() {
  t.describe('app.framework: @Component: LangSwitcherCmp', () => {
 
    t.bep(() => TEST_COMPONENT_PROVIDERS({http: true}));
    
    t.it('should work',
      t.injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then(rootTC => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;
            t.e(DOM.querySelectorAll(appDOMEl, 'form > select option').length).toBe(1);
            t.e(DOM.querySelectorAll(appDOMEl, 'form > select option')[0].value).toBe('en');
          });
      }));
  });
  
  t.describe('app.framework: @Component: LangSwitcherCmp with multiple languages', () => {
    t.be(() => Multilingual.SUPPORTED_LANGUAGES = AppConfig.SUPPORTED_LANGUAGES);
    t.bep(() => TEST_COMPONENT_PROVIDERS({http: true}));
    
    t.it('should work',
      t.injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then(rootTC => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;
            t.e(DOM.querySelectorAll(appDOMEl, 'form > select option').length).toBe(5);
            t.e(DOM.querySelectorAll(appDOMEl, 'form > select option')[0].value).toBe('en');
            t.e(DOM.querySelectorAll(appDOMEl, 'form > select option')[1].value).toBe('es');
            t.e(DOM.querySelectorAll(appDOMEl, 'form > select option')[2].value).toBe('fr');
            t.e(DOM.querySelectorAll(appDOMEl, 'form > select option')[3].value).toBe('ru');
            t.e(DOM.querySelectorAll(appDOMEl, 'form > select option')[4].value).toBe('bg');
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<div><lang-switcher></lang-switcher></div>',
  directives: [LangSwitcherCmp]
})
class TestComponent {}
