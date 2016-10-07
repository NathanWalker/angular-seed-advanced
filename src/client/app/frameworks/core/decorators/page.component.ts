import { DecoratorUtils } from './utils';
import { Config } from '../utils/config';
import { PAGE  } from '../tokens';

export function PageComponent(metadata: any = {}) {
  return function(cls: any) {
    return DecoratorUtils.annotateComponent(cls, metadata, {
      providers: [
        { provide: PAGE, useClass: Config.PageClass }
      ]
    });
  };
}
