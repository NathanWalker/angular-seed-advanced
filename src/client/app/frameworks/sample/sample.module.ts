// angular
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// app
import { ToolbarComponent } from './components/toolbar.component';
import { NavbarComponent } from './components/navbar.component';
import { nameListReducer, NameListService, NameListEffects } from './services/name-list.service';
import { MultilingualModule } from '../i18n/multilingual.module';
import { multilingualReducer, IMultilingualState, MultilingualEffects } from '../i18n/services/multilingual.service';

// state
export interface AppStoreI {
  i18n: IMultilingualState;
  names: Array<string>;
};

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MultilingualModule,
    StoreModule.provideStore({
      i18n: multilingualReducer,
      names: nameListReducer
    }),
    EffectsModule.run(MultilingualEffects),
    EffectsModule.run(NameListEffects)
  ],
  declarations: [
    ToolbarComponent,
    NavbarComponent
  ],
  providers: [
    NameListService
  ],
  exports: [
    ToolbarComponent,
    NavbarComponent
  ]
})
export class SampleModule {

  constructor(@Optional() @SkipSelf() parentModule: SampleModule) {
    if (parentModule) {
      throw new Error('SampleModule already loaded; Import in root module only.');
    }
  }
}
