import {t} from '../../../test.framework/index';

import {NameListService} from './name-list.service';

export function main() {
  t.describe('app.framework: NameListService', () => {
    let nameList;

    t.be(() => {
      nameList = new NameListService;
    });

    t.it('should return the list of names', () => {
      let names = nameList.get();
      t.e(names).toEqual(jasmine.any(Array));
    });
  });
}
