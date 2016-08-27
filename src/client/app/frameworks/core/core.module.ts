// angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// app
import { PlatformDirective } from './directives/platform.directive';
import { ConsoleService } from './services/console.service';
import { LogService } from './services/log.service';
import { RouterExtensions } from './services/router-extensions';
import { WindowService } from './services/window.service';

interface ICoreModuleOptions {
  window?: any;
  console?: any;
}

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule
  ],
  declarations: [
    PlatformDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpModule
  ],
  providers: [
    ConsoleService,
    LogService,
    RouterExtensions,
    WindowService
  ]
})
export class CoreModule {
  static forRoot(options: ICoreModuleOptions): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: WindowService, useValue: options.window },
        {provide: ConsoleService, useValue: options.console }
      ]
    };
  }
}
