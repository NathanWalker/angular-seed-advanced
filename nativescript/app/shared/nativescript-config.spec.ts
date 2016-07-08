import {t} from '../app/frameworks/test/index';
import {NativeScriptConfig} from './nativescript-config';

export function main() {
  t.describe('nativescript: NativeScriptConfig', () => {
    
    t.it('sanity', () => {   
      t.e(NativeScriptConfig.PAGE).toBeUndefined();
    });
  });
}
