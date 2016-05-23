import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component, provide} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

import {PlatformDirective} from './platform.directive';
import {t} from '../../test.framework/index';
import {WindowService} from '../../core.framework/index';
import {WindowMock} from '../../core.framework/testing/index';

@Component({ 
  viewProviders: [
    provide(WindowService, { useClass: WindowMock})
  ],
  selector: 'test',
  template: `<div platform></div>`,
  directives: [PlatformDirective]
})
class TestComponent {}

export function main() {
  t.describe('core.framework: PlatformDirective', () => {
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
