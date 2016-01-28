import {
describe,
expect,
it,
inject,
beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {Multilingual} from './multilingual.service';
import {TranslateService} from 'ng2-translate/ng2-translate';

class TranslateMock {
  public prefix: string;
  constructor(prefix: string, suffix: string) {
    this.prefix = prefix;
  }
  public getTranslation(lang: string): any {
    return {
      'TEST': 'test'
    };
  }
  public use(lang: string) {
    console.log(lang);
  }
  public useStaticFilesLoader() {
    return;
  }
}

export function main() {
    describe('Multilingual', () => {
        beforeEachProviders(() => [
          provide(TranslateService, { useClass: TranslateMock })
        ]);
        it('should get language', inject([Multilingual], (multilang) => {
          expect(multilang.getLang()).toBe('blah');
        }));
    });
}
