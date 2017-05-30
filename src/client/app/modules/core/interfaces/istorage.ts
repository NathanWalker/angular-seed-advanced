// standard localStorage interface
export interface IStorage {
  setItem(key: StorageKey, value: any): void;
  getItem(key: StorageKey): any;
  removeItem(key: StorageKey): void;
}

// to limit interaction with localStorage to a certain whitelist, you can list those keys here
export enum StorageKey {
  USERNAME
}
