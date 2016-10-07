import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { PlatformDirective } from './platform.directive';
import { t } from '../../test/index';
import { WindowService } from '../../core/index';
import { WindowMock } from '../../core/testing/index';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    declarations: [PlatformDirective, TestComponent]
  });
};

@Component({
  viewProviders: [
    { provide: WindowService, useClass: WindowMock }
  ],
  selector: 'test-cmp',
  template: `<div platform></div>`
})
class TestComponent { }

export function main() {
  t.describe('core: PlatformDirective', () => {

    t.be(testModuleConfig);

    t.it('should add platform class',
      t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            let compDOMEl = fixture.debugElement.children[0].nativeElement;
            t.e(compDOMEl.getAttribute('class')).toBe('web');
          });
      }));
  });
}
