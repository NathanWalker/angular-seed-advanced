// angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// app
import {HomeComponent} from './home.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})

export class HomeModule { }
