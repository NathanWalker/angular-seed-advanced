import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {RouterConfig} from '@angular/router';

import {t} from '../../frameworks/test/index';
import {TEST_CORE_PROVIDERS, TEST_HTTP_PROVIDERS, TEST_ROUTER_PROVIDERS} from '../../frameworks/core/testing/index';
import {NameListService} from '../../frameworks/app/index';
import {TEST_MULTILINGUAL_PROVIDERS} from '../../frameworks/i18n/testing/index';
import {AppComponent} from './app.component';
import {HomeComponent} from '../home/home.component';
import {AboutComponent} from '../about/about.component';

const config:RouterConfig = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent}
];

export function main() {
  t.describe('@Component: AppComponent', () => {
    t.it('should work',
      t.async(t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC:any) => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.children[0].nativeElement;
            t.e(getDOM().querySelectorAll(appDOMEl, 'sd-app sd-navbar > nav > a')[1].href).toMatch(/\/about/);
          });
      })));
  });
}

@Component({
  providers: [
    disableDeprecatedForms(),
    provideForms(),
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
