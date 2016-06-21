import {Injectable} from '@angular/core';

const localForage:LocalForage = require('localforage');

@Injectable()
export class LocalForageService {

  public instance(): LocalForage {
    return localForage;
  }

}
