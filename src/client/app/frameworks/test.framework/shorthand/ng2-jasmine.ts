import {
  AnyTestFn,
  afterEach,
  beforeEach,
  beforeEachProviders,
  ddescribe,
  describe,
  fdescribe,
  xdescribe,
  expect,
  FunctionWithParamTokens,
  inject,
  injectAsync,
  iit,
  it,
  fit,
  xit
} from 'angular2/testing';

// intellisense via shorthand
export interface TestApi {
  ae: Function;
  afterEach: Function;
  ddescribe: Function;
  describe: Function;
  fdescribe: Function;
  xdescribe: Function;
  be(fn: FunctionWithParamTokens | AnyTestFn): void;
  beforeEach(fn: FunctionWithParamTokens | AnyTestFn): void;
  beforeEachProviders(fn: any): void;
  bep(fn: any): void;
  e(actual: any): jasmine.Matchers;
  expect(actual: any): jasmine.Matchers;
  fail(e?: any): void;
  inject(tokens: any[], fn: Function): FunctionWithParamTokens;
  injectAsync(tokens: any[], fn: Function): FunctionWithParamTokens;
  iit(name: string, fn: FunctionWithParamTokens | AnyTestFn, timeOut?: number): void;
  it(name: string, fn: FunctionWithParamTokens | AnyTestFn, timeOut?: number): void;
  fit(name: string, fn: FunctionWithParamTokens | AnyTestFn, timeOut?: number): void;
  xit(name: string, fn: FunctionWithParamTokens | AnyTestFn, timeOut?: number): void;
  pending(reason?: string): void;
  spyOn(object: any, method: string): jasmine.Spy;
};

// shorthand - reduces boilerplate in every test
export const Ng2Jasmine: TestApi = {
  ae: afterEach, // shorthand
  afterEach: afterEach,
  ddescribe: ddescribe,
  describe: describe,
  fdescribe: fdescribe,
  xdescribe: xdescribe,
  be: beforeEach,  // shorthand beforeEach
  beforeEach: beforeEach,
  beforeEachProviders: beforeEachProviders,
  bep: beforeEachProviders,  // shorthand beforeEachProviders
  e: expect, // shorthand expect
  expect: expect,
  fail: fail,
  inject: inject,
  injectAsync: injectAsync,
  iit: iit,
  it: it,
  fit: fit,
  xit: xit,
  pending: pending,
  spyOn: spyOn
};
