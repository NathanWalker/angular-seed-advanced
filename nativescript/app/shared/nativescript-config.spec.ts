import {t} from '../app/frameworks/test.framework/index';
import {NativeScriptConfig} from './nativescript-config';

export function main() {
  t.describe('nativescript.framework: NativeScriptConfig', () => {
    
    t.it('sanity', () => {   
      t.e(NativeScriptConfig.PAGE).toBeUndefined();
    });
  });
}
