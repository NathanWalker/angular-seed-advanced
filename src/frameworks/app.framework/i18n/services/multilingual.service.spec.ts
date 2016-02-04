import {
describe,
expect,
it,
inject,
beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {TranslateService} from 'ng2-translate/ng2-translate';

import {Window} from '../../core/interfaces/iwindow';
import {Multilingual} from './multilingual.service';


class TranslateMock {
  public getTranslation(lang: string): any {
    return {
      'TEST': 'test'
    };
  }
  public use(lang: string) {
    console.log(lang);
  }
  public useStaticFilesLoader(path: string) {
    console.log(path);
  }
}

class WindowMock {
  public navigator: any = {};
  public location: any = {};
  public alert(msg: string): void {

  }
  public confirm(msg: string): void {

  }
}

export function main() {
    describe('Multilingual', () => {
      beforeEachProviders(() => [
          provide(Window, { useClass: WindowMock }),
          provide(TranslateService, { useClass: TranslateMock }),
          provide(Multilingual, {
            useFactory: (translate, win) => {
              return new Multilingual(translate, win);
            },
            deps: [TranslateService, Window]
          })
        ]);
        it('should get language', inject([Multilingual], (multilang) => {
          expect(multilang.getLang()).toBe('en');
        }));
    });
}
