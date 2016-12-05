// app
import { t } from '../../test/index';

// module
import { Config } from './config';
import { ViewBroker } from './view-broker';

export function main() {
  t.describe('utilities: ViewBroker', () => {
    t.be(() => Config.RESET());
    
    t.it('TEMPLATE_URL: web', () => {   
      Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;
      t.e(ViewBroker.TEMPLATE_URL('./app/components/home/home.html')).toBe('./app/components/home/home.html');
    });
    t.it('TEMPLATE_URL: mobile_native', () => {
      Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;
      t.e(ViewBroker.TEMPLATE_URL('./app/components/home/home.html')).toBe('./app/components/home/home.tns.html');
    });
    t.it('TEMPLATE_URL: mobile_hybrid', () => {
      Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_HYBRID;
      t.e(ViewBroker.TEMPLATE_URL('./app/components/home/home.html')).toBe('./app/components/home/home.html');
    });
    t.it('TEMPLATE_URL: desktop', () => {
      Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
      t.e(ViewBroker.TEMPLATE_URL('./app/components/home/home.html')).toBe('./app/components/home/home.html');
    });
  });
}
