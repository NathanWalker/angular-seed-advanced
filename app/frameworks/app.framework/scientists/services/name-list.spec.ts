import {NameList} from './name-list';

import {t} from '../../../test.framework/_providers';

export function main() {
  t.describe('app.framework: NameList', () => {
    let nameList;

    t.be(() => {
      nameList = new NameList;
    });

    t.it('should return the list of names', () => {
      let names = nameList.get();
      t.e(names).toEqual(jasmine.any(Array));
    });
  });
}
