import {t} from '../../test.framework/index';
import {CoreConfigService, ViewBrokerService} from '../index';

export function main() {
  t.describe('core.framework: ViewBrokerService', () => {
    t.be(() => CoreConfigService.RESET());
    
    t.it('TEMPLATE_URL: web', () => {   
      CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.WEB;
      t.e(ViewBrokerService.TEMPLATE_URL('./components/app/app.html')).toBe('./components/app/app.html');
    });
    t.it('TEMPLATE_URL: mobile_native', () => {
      CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.MOBILE_NATIVE;
      t.e(ViewBrokerService.TEMPLATE_URL('./components/app/app.html')).toBe('./frameworks/nativescript.framework/components/app/app.html');
    });
    t.it('TEMPLATE_URL: mobile_hybrid', () => {
      CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.MOBILE_HYBRID;
      t.e(ViewBrokerService.TEMPLATE_URL('./components/app/app.html')).toBe('./components/app/app.html');
    });
    t.it('TEMPLATE_URL: desktop', () => {
      CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.DESKTOP;
      t.e(ViewBrokerService.TEMPLATE_URL('./components/app/app.html')).toBe('./components/app/app.html');
    });
  });
}
