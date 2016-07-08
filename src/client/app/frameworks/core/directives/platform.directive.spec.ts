import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component, provide} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

import {PlatformDirective} from './platform.directive';
import {t} from '../../test/index';
import {WindowService} from '../../core/index';
import {WindowMock} from '../../core/testing/index';

@Component({ 
  viewProviders: [
    provide(WindowService, { useClass: WindowMock})
  ],
  selector: 'test-cmp',
  template: `<div platform></div>`,
  directives: [PlatformDirective]
})
class TestComponent {}

export function main() {
  t.describe('core: PlatformDirective', () => {
    let rootTC: any;

    t.be(t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(TestComponent)
        .then(f => rootTC = f);
    }));
    
    //specs
    t.it('should add platform class', () => {
      rootTC.detectChanges();
      let compDOMEl = rootTC.debugElement.children[0].nativeElement;
      expect(getDOM().classList(compDOMEl)).toEqual(['web']); 
    });
});
}
