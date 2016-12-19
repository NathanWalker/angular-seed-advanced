// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScript } from 'nativescript-angular/platform-static';

<<<<<<< HEAD:nativescript/src/native.module.aot.ts
import { NativeModuleNgFactory } from "./native.module.ngfactory";
import { enableProdMode } from '@angular/core';

enableProdMode();
=======
import { NativeModuleNgFactory } from './native.module.ngfactory';
>>>>>>> upstream/new-build-system-new-webpack:nativescript/src/app.aot.ts

platformNativeScript().bootstrapModuleFactory(NativeModuleNgFactory);
