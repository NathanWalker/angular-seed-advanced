// angular
import {
  async,
  fakeAsync,
  inject,
  tick
} from '@angular/core/testing';

// intellisense via shorthand
export interface TestApi {
  ae: Function;
  afterEach: Function;
  describe: Function;
  fdescribe: Function;
  xdescribe: Function;
  async(fn: Function): Function;
  fakeAsync(fn: Function): Function;
  be(fn: Function): void;
  beforeEach(fn: Function): void;
  e(actual: any): jasmine.Matchers;
  expect(actual: any): jasmine.Matchers;
  fail(e?: any): void;
  inject(tokens: Array<any>, fn: Function): Function;
  it(name: string, fn: Function, timeOut?: number): void;
  fit(name: string, fn: Function, timeOut?: number): void;
  xit(name: string, fn: Function, timeOut?: number): void;
  pending(reason?: string): void;
  spyOn(object: any, method: string): jasmine.Spy;
  tick(delay?: number): void;
}

// shorthand - reduces boilerplate in every test
export const Ng2Jasmine: TestApi = {
  ae: afterEach, // shorthand
  afterEach: afterEach,
  describe: describe,
  fdescribe: fdescribe,
  xdescribe: xdescribe,
  async: async,
  fakeAsync: fakeAsync,
  be: beforeEach,  // shorthand beforeEach
  beforeEach: beforeEach,
  e: expect, // shorthand expect
  expect: expect,
  fail: fail,
  inject: inject,
  it: it,
  fit: fit,
  xit: xit,
  pending: pending,
  spyOn: spyOn,
  tick: tick
};
