import {t} from '../../../test.framework/index';

import {NameListService} from './name-list.service';

export function main() {
  t.describe('app.framework: NameListService', () => {
    t.bep(() => {
      return [NameListService];
    });

    t.it('should return the list of names', t.inject([NameListService], (nameList: NameListService) => {
      let names = nameList.get();
      t.e(names).toEqual(jasmine.any(Array));
    }));
  });
}
