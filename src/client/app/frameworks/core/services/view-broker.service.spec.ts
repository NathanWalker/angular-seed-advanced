import {t} from '../../test/index';
import {CoreConfigService, ViewBrokerService} from '../index';

export function main() {
  t.describe('core: ViewBrokerService', () => {
    t.be(() => CoreConfigService.RESET());
    
    t.it('TEMPLATE_URL: web', () => {   
      CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.WEB;
      t.e(ViewBrokerService.TEMPLATE_URL('./app/components/home/home.html')).toBe('./app/components/home/home.html');
    });
    t.it('TEMPLATE_URL: mobile_native', () => {
      CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.MOBILE_NATIVE;
      t.e(ViewBrokerService.TEMPLATE_URL('./app/components/home/home.html')).toBe('./app/components/home/home.tns.html');
    });
    t.it('TEMPLATE_URL: mobile_hybrid', () => {
      CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.MOBILE_HYBRID;
      t.e(ViewBrokerService.TEMPLATE_URL('./app/components/home/home.html')).toBe('./app/components/home/home.html');
    });
    t.it('TEMPLATE_URL: desktop', () => {
      CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.DESKTOP;
      t.e(ViewBrokerService.TEMPLATE_URL('./app/components/home/home.html')).toBe('./app/components/home/home.html');
    });
  });
}
