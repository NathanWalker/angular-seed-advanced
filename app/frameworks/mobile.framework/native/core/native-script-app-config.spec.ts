import {t} from '../../../test.framework/_providers';
import {NativeScriptAppConfig} from './native-script-app-config';

export function main() {
  t.describe('mobile.framework/native: NativeScriptAppConfig', () => {
    
    t.it('sanity', () => {   
      t.e(NativeScriptAppConfig.PAGE).toBeUndefined();
    });
  });
}
