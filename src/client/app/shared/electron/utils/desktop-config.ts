// app
import { ILang } from '../../core/index';

export class DesktopConfig {

  public static GET_SUPPORTED_LANGUAGES(): Array<ILang> {
    return [
      { code: 'en', title: 'English' },
      { code: 'es', title: 'Spanish' },
      { code: 'fr', title: 'French' },
      { code: 'ru', title: 'Russian' },
      { code: 'bg', title: 'Bulgarian' }
    ];
  }

}
