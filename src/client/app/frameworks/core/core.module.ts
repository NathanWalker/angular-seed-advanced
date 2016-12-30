// angular
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// libs
import { ConfigLoader, ConfigStaticLoader, ConfigModule, ConfigService } from 'ng2-config';

// module
import { CORE_DIRECTIVES } from './directives/index';
import { CORE_PROVIDERS } from './services/index';
import { Config } from './utils/index';

interface ICoreModuleOptions {
  window?: any;
  console?: any;
}

// for AoT compilation
export function configFactory(): ConfigLoader {
  return new ConfigStaticLoader(`${Config.IS_MOBILE_NATIVE() ? '/' : ''}assets/app.config.json`);
}

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    ConfigModule.forRoot(),
  ],
  declarations: [
    CORE_DIRECTIVES
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpModule,
    CORE_DIRECTIVES
  ],
  providers: [
    CORE_PROVIDERS
  ]
})
export class CoreModule {
  // configuredProviders: *required to configure WindowService and ConsoleService per platform
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: configuredProviders
    };
  }
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule already loaded; Import in root module only.');
    }
  }
}
