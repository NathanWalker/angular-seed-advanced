// import 'reflect-metadata';
// import 'rxjs/add/operator/map';

// nativescript
import { NativeScriptModule, platformNativeScriptDynamic, onAfterLivesync, onBeforeLivesync } from 'nativescript-angular/platform';

// app
import { NativeModule} from './native.module';

platformNativeScriptDynamic().bootstrapModule(NativeModule);
