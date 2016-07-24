import {t} from '../../test/index';
import {Config, ViewBrokerService} from '../index';

export function main() {
  t.describe('core: ViewBrokerService', () => {
    t.be(() => Config.RESET());
    
    t.it('TEMPLATE_URL: web', () => {   
      Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;
      t.e(ViewBrokerService.TEMPLATE_URL('./app/components/home/home.html')).toBe('./app/components/home/home.html');
    });
    t.it('TEMPLATE_URL: mobile_native', () => {
      Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;
      t.e(ViewBrokerService.TEMPLATE_URL('./app/components/home/home.html')).toBe('./app/components/home/home.tns.html');
    });
    t.it('TEMPLATE_URL: mobile_hybrid', () => {
      Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_HYBRID;
      t.e(ViewBrokerService.TEMPLATE_URL('./app/components/home/home.html')).toBe('./app/components/home/home.html');
    });
    t.it('TEMPLATE_URL: desktop', () => {
      Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
      t.e(ViewBrokerService.TEMPLATE_URL('./app/components/home/home.html')).toBe('./app/components/home/home.html');
    });
  });
}
