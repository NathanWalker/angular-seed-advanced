import {TestComponentBuilder} from 'angular2/testing';
import {Component, provide} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {PlatformDirective} from './platform.directive';
import {t, WindowMock} from '../../test.framework/index';
import {WindowService} from '../../core.framework/index';

@Component({ 
  selector: 'test',
  template: `<div platform></div>`,
  directives: [PlatformDirective]
})
class TestComponent {}

export function main() {
  t.describe('core.framework: PlatformDirective', () => {
    let rootTC: any;
    
    t.bep(() => [TestComponentBuilder, provide(WindowService, { useClass: WindowMock})]);

    t.be(t.injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(TestComponent)
        .then(f => rootTC = f);
    }));
    
    //specs
    t.it('should add platform class', () => {
      rootTC.detectChanges();
      let compDOMEl = rootTC.debugElement.children[0].nativeElement;
      expect(DOM.classList(compDOMEl)).toEqual(['web']); 
    });
});
}
