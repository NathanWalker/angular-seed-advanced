import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
import {disableDeprecatedForms, provideForms} from '@angular/forms/index';
import {RouterConfig} from '@angular/router';

import {t} from '../../frameworks/test.framework/index';
import {TEST_CORE_PROVIDERS, TEST_HTTP_PROVIDERS, TEST_ROUTER_PROVIDERS} from '../../frameworks/core.framework/testing/index';
import {NameListService} from '../../frameworks/app.framework/index';
import {TEST_MULTILINGUAL_PROVIDERS} from '../../frameworks/i18n.framework/testing/index';
import {AppComponent} from './app.component';
import {HomeComponent} from '../home/home.component';
import {AboutComponent} from '../about/about.component';

const config:RouterConfig = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent}
];

export function main() {
  t.describe('@Component: AppComponent', () => {
    // Disable old forms
    let providerArr: any[];

    t.be(() => { providerArr = [disableDeprecatedForms(), provideForms()]; });
    
    t.it('should work',
      t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC:any) => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.children[0].nativeElement;
            t.e(getDOM().querySelectorAll(appDOMEl, 'sd-app sd-navbar > nav > a')[1].href).toMatch(/\/about/);
          });
      }));
  });
}

@Component({
  viewProviders: [
    TEST_CORE_PROVIDERS(),
    TEST_HTTP_PROVIDERS(),
    NameListService,
    TEST_ROUTER_PROVIDERS({ config, component: TestComponent }),
    TEST_MULTILINGUAL_PROVIDERS()
  ],
  selector: 'test-cmp',
  directives: [AppComponent],
  template: '<sd-app></sd-app>'
})
class TestComponent {}
