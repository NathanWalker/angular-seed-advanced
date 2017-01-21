// angular
import { Directive, ElementRef, Renderer } from '@angular/core';

// module
import { WindowService } from '../services/window.service';

@Directive({
  selector: '[platform]'
})
export class PlatformDirective {

  constructor(private el: ElementRef, private renderer: Renderer, private win: WindowService) {
    let platformClass = 'web';
    let agent = win.navigator.userAgent.toLowerCase();
    if (agent.indexOf('electron') > -1) {
      platformClass = 'desktop';
    } else if (agent.indexOf('nativescript') > -1) {
      platformClass = 'nativescript';
    } 
    renderer.setElementClass(el.nativeElement, platformClass, true);
  }
}
