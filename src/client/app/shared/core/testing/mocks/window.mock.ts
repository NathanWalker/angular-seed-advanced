export class WindowMock {
  public navigator: any = {
    language: 'en-US',
    userAgent: 'testing'
  };
  public location: any = {};
  public alert(msg: string): void {
    return;
  }
  public confirm(msg: string): void {
    return;
  }
}

export class WindowMockFrench extends WindowMock {
  constructor() {
    super();
    this.navigator.language = 'fr-US';
  }
}

export class WindowMockNoLanguage extends WindowMock {
  constructor() {
    super();
    this.navigator.language = undefined;
  }
}
