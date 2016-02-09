import {t} from '../../../test.framework/_providers';
import {AppConfig} from './app-config';
import {ViewBroker} from './view-broker';

export function main() {
  t.describe('app.framework: ViewBroker', () => {
    t.be(() => AppConfig.RESET());
    
    t.it('TEMPLATE_URL: web', () => {   
      AppConfig.PLATFORM_TARGET = AppConfig.PLATFORMS.WEB;
      t.e(ViewBroker.TEMPLATE_URL('./components/app/app.html')).toBe('./components/app/app.html');
    });
    t.it('TEMPLATE_URL: mobile_native', () => {
      AppConfig.PLATFORM_TARGET = AppConfig.PLATFORMS.MOBILE_NATIVE;
      t.e(ViewBroker.TEMPLATE_URL('./components/app/app.html')).toBe('./frameworks/mobile.framework/native/components/app/app.html');
    });
    t.it('TEMPLATE_URL: mobile_hybrid', () => {
      AppConfig.PLATFORM_TARGET = AppConfig.PLATFORMS.MOBILE_HYBRID;
      t.e(ViewBroker.TEMPLATE_URL('./components/app/app.html')).toBe('./components/app/app.html');
    });
    t.it('TEMPLATE_URL: desktop', () => {
      AppConfig.PLATFORM_TARGET = AppConfig.PLATFORMS.DESKTOP;
      t.e(ViewBroker.TEMPLATE_URL('./components/app/app.html')).toBe('./components/app/app.html');
    });
  });
}
