import {t} from '../../test/index';
import {ElectronEventService} from './event.service';
declare var window: any;

export function main() {
  t.describe('electron: ElectronEventService', () => {
    let spyWindowRemoveEvent: any;
    let customEvent: any = new CustomEvent('customEvent', { detail: { value: 'test' } });
    let otherEvent: any = new CustomEvent('otherEvent', { detail: { value: 'test2' } });

    t.be(() => spyWindowRemoveEvent = t.spyOn(window, 'removeEventListener'));
    
    t.it('should register events and respond to multiple triggers', (done: any) => {
      let cnt = 0;
      let electronEvent = ElectronEventService.on('customEvent').subscribe((e: any) => {
        t.e(e.detail).toEqual({ value: 'test' });
        cnt++;
        if (cnt === 2) {
          electronEvent.unsubscribe();
          // the event should be removed when unsubscribing
          t.e(spyWindowRemoveEvent).toHaveBeenCalled();
          done();
        } else {
          setTimeout(() => window.dispatchEvent(customEvent)); // twice
        }
      });
      window.dispatchEvent(customEvent); // once
    });

    t.it('should allow multiple events to be registered', (done: any) => {
      ElectronEventService.on('otherEvent').subscribe((e: any) => {
        t.e(e.detail).toEqual({ value: 'test2' });

        ElectronEventService.on('customEvent').subscribe((e: any) => {
          t.e(e.detail).toEqual({ value: 'test' });
          done();
        });
        window.dispatchEvent(customEvent);
      });
      window.dispatchEvent(otherEvent);
    });    
  });
}
