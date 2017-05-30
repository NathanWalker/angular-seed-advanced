// angular
import { Injectable } from '@angular/core';

// module
import { IStorage, StorageKey } from '../interfaces/istorage';

@Injectable()
export class StorageService implements IStorage {

  setItem(key: StorageKey, value: any): void {
    localStorage.setItem('' + key, value === null ? null : JSON.stringify(value));
  }

  getItem(key: StorageKey): any {
    const value = localStorage.getItem('' + key);
    return value === null ? null : JSON.parse(value);
  }

  removeItem(key: StorageKey): void {
    localStorage.removeItem('' + key);
  }
}
