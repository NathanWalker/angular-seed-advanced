import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainModule} from '../../frameworks/ngModules/main.module';
import {HomeComponent} from './home.component';
import {NameListService} from '../../frameworks/app/index';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [CommonModule, MainModule, TranslateModule.forRoot(), FormsModule],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    providers: [NameListService]
})

export class HomeModule { }
