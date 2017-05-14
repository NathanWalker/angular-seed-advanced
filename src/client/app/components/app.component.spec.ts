// angular
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { StoreModule } from '@ngrx/store';
import { Angulartics2Module, Angulartics2Segment } from 'angulartics2';

// app
import { t } from '../modules/test/index';
import { Config } from '../modules/core/index';
import { TEST_CORE_PROVIDERS, TEST_HTTP_PROVIDERS } from '../modules/core/testing/index';
import { NameListService } from '../modules/sample/index';
import { SharedModule } from '../modules/shared/index';
import { MultilingualModule } from '../modules/i18n/multilingual.module';
import { reducer, LanguageProviders } from '../modules/i18n/index';

// module
import { APP_COMPONENTS } from './index';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const config:Route[] = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent}
];

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      SharedModule,
      Angulartics2Module.forRoot([
        Angulartics2Segment
      ]),
      MultilingualModule,
      StoreModule.provideStore({ }),
      RouterTestingModule.withRoutes(config)
    ],
    declarations: [
      TestComponent,
      ...APP_COMPONENTS
    ],
    providers: [
      TEST_CORE_PROVIDERS(),
      TEST_HTTP_PROVIDERS(),
      NameListService,
      LanguageProviders
    ]
  });
};

export function main() {
  t.describe('@Component: AppComponent', () => {

    t.be(testModuleConfig);

    t.it('should build without a problem',
      t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            t.e(fixture.nativeElement).toBeTruthy();
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-app></sd-app>'
})
class TestComponent {}
