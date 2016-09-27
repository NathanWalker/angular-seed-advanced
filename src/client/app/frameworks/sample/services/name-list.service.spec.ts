import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
// import {HttpModule, Response, ResponseOptions} from '@angular/http';
import { HttpModule } from '@angular/http';
// import {MockBackend} from '@angular/http/testing';

// libs
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

// app
import { t } from '../../test/index';
// import {TEST_CORE_PROVIDERS, GET_HTTP_PROVIDERS_INJECTOR, TEST_LOCATION_PROVIDERS} from '../../core/testing/index';
import { AnalyticsModule } from '../../analytics/analytics.module';
import { NameListService, nameListReducer } from './name-list.service';

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [FormsModule, AnalyticsModule, StoreModule.provideStore({ names: nameListReducer }), HttpModule, RouterTestingModule],
    providers: [NameListService]
  });
};

export function main() {
  t.describe('app: NameListService', () => {
    // let nameList: NameListService;

    t.be(testModuleConfig);
    // t.be(() => {
    //   testModuleConfig();

    //   let injector = GET_HTTP_PROVIDERS_INJECTOR([
    //     TEST_CORE_PROVIDERS(),
    //     TEST_LOCATION_PROVIDERS(),
    //     NameListService
    //   ]);

    //   let backend = injector.get(MockBackend);
    //   let connection: any;
    //   backend.connections.subscribe((c: any) => connection = c);
    //   nameList = injector.get(NameListService);
    //   connection.mockRespond(new Response(new ResponseOptions({ body: '["Dijkstra", "Hopper"]' })));
    // });

    t.it('names should be Observable', t.inject([NameListService], (nameList:any) => {
      let names = nameList.names;
      t.e(names).toEqual(jasmine.any(Observable));
      names.subscribe((names: Array<string>) => {
        t.e(names).toEqual([]);
      });
    }));

    t.it('add should work', t.inject([NameListService], (nameList:any) => {
      nameList.add('test');
      nameList.names.subscribe((names: Array<string>) => {
        t.e(names).toEqual(['test']);
      });
    }));
  });
}
