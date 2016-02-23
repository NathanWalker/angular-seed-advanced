import {t} from '../../../test.framework/index';
import {AppConfigNativeScript} from './app_config_nativescript';

export function main() {
  t.describe('mobile.framework/native: AppConfigNativeScript', () => {
    
    t.it('sanity', () => {   
      t.e(AppConfigNativeScript.PAGE).toBeUndefined();
    });
  });
}
