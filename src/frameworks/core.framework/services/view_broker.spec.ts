import {t} from '../../test.framework/index';
import {CoreConfig, ViewBroker} from '../index';

export function main() {
  t.describe('core.framework: ViewBroker', () => {
    t.be(() => CoreConfig.RESET());
    
    t.it('TEMPLATE_URL: web', () => {   
      CoreConfig.PLATFORM_TARGET = CoreConfig.PLATFORMS.WEB;
      t.e(ViewBroker.TEMPLATE_URL('./components/app/app.html')).toBe('./components/app/app.html');
    });
    t.it('TEMPLATE_URL: mobile_native', () => {
      CoreConfig.PLATFORM_TARGET = CoreConfig.PLATFORMS.MOBILE_NATIVE;
      t.e(ViewBroker.TEMPLATE_URL('./components/app/app.html')).toBe('./frameworks/mobile.framework/nativescript/views/components/app/app.html');
    });
    t.it('TEMPLATE_URL: mobile_hybrid', () => {
      CoreConfig.PLATFORM_TARGET = CoreConfig.PLATFORMS.MOBILE_HYBRID;
      t.e(ViewBroker.TEMPLATE_URL('./components/app/app.html')).toBe('./components/app/app.html');
    });
    t.it('TEMPLATE_URL: desktop', () => {
      CoreConfig.PLATFORM_TARGET = CoreConfig.PLATFORMS.DESKTOP;
      t.e(ViewBroker.TEMPLATE_URL('./components/app/app.html')).toBe('./components/app/app.html');
    });
  });
}
