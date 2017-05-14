import { TestBed, getTestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ResponseOptions, Response, XHRBackend, HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

// libs
import { Store, StoreModule } from '@ngrx/store';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';

// app
import { t } from '../../test/index';
// import {TEST_CORE_PROVIDERS, GET_HTTP_PROVIDERS_INJECTOR, TEST_LOCATION_PROVIDERS} from '../../core/testing';
import { AnalyticsModule } from '../../analytics/analytics.module';
import { NameListService, SampleEffects, reducer, NameList } from '../index';

// test module configuration for each test
const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      FormsModule, AnalyticsModule,
      StoreModule.provideStore({ sample: reducer }),
      EffectsTestingModule,
      HttpModule, RouterTestingModule
    ],
    providers: [
      NameListService,
      SampleEffects,
      {provide: XHRBackend, useClass: MockBackend}
    ]
  });
};

const mockBackendResponse = (connection: MockConnection, response: string) => {
  connection.mockRespond(new Response(new ResponseOptions({body: response})));
};

export function main() {
  t.describe('app: NameListService', () => {
    let injector: Injector;
    let backend: MockBackend;
    let nameList: NameListService;
    let store: Store<any>;
    let runner: EffectsRunner; // ngrx/effects tester
    let nameListEffects: SampleEffects;
    let connection: MockConnection; // this will be set when a new connection is emitted from the backend.

    t.be(() => {
      testModuleConfig();
      injector = getTestBed();
      backend = <any>injector.get(XHRBackend);
      store = injector.get(Store);
      runner = injector.get(EffectsRunner);
      nameListEffects = injector.get(SampleEffects);
      // sets the connection when someone tries to access the backend with an xhr request
      backend.connections.subscribe((c: MockConnection) => connection = c);
      // construct after setting up connections above
      nameList = injector.get(NameListService);
    });

    t.it('should initialize', () => {
      runner.queue(new NameList.InitAction());

      nameListEffects.init$.subscribe(result => {
        t.e(result).toEqual(new NameList.InitializedAction([ 'Dijkstra', 'Hopper' ]));
      });

      // mock response after the xhr request (which happens in constructor), otherwise it will be undefined
      mockBackendResponse(connection, '["Dijkstra", "Hopper"]');
    });

    t.it('add action', () => {
      runner.queue(new NameList.AddAction('Minko'));

      nameListEffects.add$.subscribe(result => {
        t.e(result).toEqual(new NameList.NameAddedAction('Minko'));
      });
    });
  });
}
