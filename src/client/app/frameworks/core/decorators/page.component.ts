import { DecoratorUtils } from './utils';
import { Config } from '../utils/config';
import { PageWrapService } from '../services/pagewrap.service';

export function PageComponent(metadata: any = {}) {
  return function(cls: any) {
    return DecoratorUtils.annotateComponent(cls, metadata, {
      providers: [
        { provide: PageWrapService, useClass: Config.PageWrapService }
      ]
    });
  };
}
