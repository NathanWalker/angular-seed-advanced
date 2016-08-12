import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from '../../components/app/toolbar.component';
import { NavbarComponent } from '../../components/app/navbar.component';
import { NameListService } from '../app/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ToolbarComponent, NavbarComponent],
  exports: [ToolbarComponent, NavbarComponent,
    CommonModule, FormsModule, RouterModule]
})
export class MainModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MainModule,
      providers: [NameListService]
    };
  }
}
