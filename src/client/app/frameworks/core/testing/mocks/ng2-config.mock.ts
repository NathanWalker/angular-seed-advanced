export class ConfigMock {
  init(): any {
    return null;
  }

  getSettings(group?: string, key?: string): any {
    return {
      logging: {
        DEBUG: {
          LEVEL_1: false,
          LEVEL_2: false,
          LEVEL_3: false,
          LEVEL_4: false
        }
      }
    };
  }
}
