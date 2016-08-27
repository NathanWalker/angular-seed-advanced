// angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// libs
import { StoreModule } from '@ngrx/store';

// app
import { ToolbarComponent } from './components/toolbar.component';
import { NavbarComponent } from './components/navbar.component';
import { nameListReducer, NameListService } from './services/name-list.service';
import { MultilingualModule } from '../i18n/multilingual.module';
import { multilingualReducer, MultilingualStateI } from '../i18n/services/multilingual.service';

// state
export interface AppStoreI {
  i18n: MultilingualStateI;
  names: Array<string>;
};

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MultilingualModule,
    StoreModule.provideStore({
      i18n: multilingualReducer,
      names: nameListReducer
    })
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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SampleModule,
      providers: [NameListService]
    };
  }
}
