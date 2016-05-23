// app
import {ILang} from '../../core.framework/index';

export class AppConfigService {
  
  public static SUPPORTED_LANGUAGES: Array<ILang> = [
    { code: 'en', title: 'English' },
    { code: 'es', title: 'Spanish' },
    { code: 'de', title: 'German' },
    { code: 'fr', title: 'French' },
    { code: 'ru', title: 'Russian' },
    { code: 'bg', title: 'Bulgarian' }
  ];

}
