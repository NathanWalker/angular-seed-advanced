import { Config } from './config';

export class ViewBroker {

  public static TEMPLATE_URL(path: string): string {
    if (Config.IS_MOBILE_NATIVE()) {
      let paths = path.split('.');
      paths.splice(-1);
      return `${paths.join('.')}.tns.html`;
    } else {
      return path;
    }
  }

  public static STYLE_URLS(paths: string[]): string[] {
    if (Config.IS_MOBILE_NATIVE()) {
      return paths.map((path) => {
        let parts = path.split('.');
        parts.splice(-1);
        return `${parts.join('.')}.tns.css`;
      });
    } else {
      return paths;
    }
  }
}
