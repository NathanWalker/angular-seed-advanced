import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainModule} from '../../frameworks/ngModules/main.module';
import {HomeComponent} from './home.component';
import {NameListService} from '../../frameworks/app/index';

@NgModule({
    imports: [CommonModule, MainModule],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    providers: [NameListService]
})

export class HomeModule { }
