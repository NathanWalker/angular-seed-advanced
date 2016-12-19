// nativescript
import { NativeScriptModule, platformNativeScriptDynamic } from 'nativescript-angular';
import { enableProdMode } from '@angular/core';

if (String('<%= BUILD_TYPE %>') === 'prod') {
  enableProdMode();
}

// app
import { NativeModule } from './native.module';

platformNativeScriptDynamic().bootstrapModule(NativeModule);
