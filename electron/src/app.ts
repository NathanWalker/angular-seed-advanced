// nativescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// app
import { ElectronModule } from './electron.module';

platformBrowserDynamic().bootstrapModule(ElectronModule);
