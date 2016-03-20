// convenient shorthand 
import {Ng2Jasmine, TestApi} from './shorthand/ng2-jasmine';
export const t: TestApi = Ng2Jasmine;

// e2e
export * from './e2e/dropdowns';

// mocks
export * from './mocks/component.mock';
export * from './mocks/window.mock';
export * from './mocks/@ngrx/store.mock';
export * from './mocks/ng2-translate/ng2-translate.mock';

// providers
export * from './providers/common';
export * from './providers/i18n';
export * from './providers/router';
export * from './providers/component';

// shorthand
export * from './shorthand/ng2-jasmine';
