import {t} from '../../../test.framework/index';
import {NativeScriptConfig} from './nativescript_config';

export function main() {
  t.describe('mobile.framework/nativescript: NativeScriptConfig', () => {
    
    t.it('sanity', () => {   
      t.e(NativeScriptConfig.PAGE).toBeUndefined();
    });
  });
}
