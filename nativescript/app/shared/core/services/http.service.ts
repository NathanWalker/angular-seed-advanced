import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

// nativescript
import {knownFolders} from 'file-system';

@Injectable()
export class NSHttpService {
  private cache: any = {};
  
  constructor(private http:Http) {
    
  }
  
  public get(url: string): Observable<any> {
    if (url.indexOf('http') === -1) {
      // local file in nativescript app
      if (this.cache[url]) {
        // already cached
        return Observable.of(this.cache[url]);
      } else {
        // requesting local file
        let app = knownFolders.currentApp();
        // strip leading slash
        url = url.indexOf('/') === 0 ? url.slice(1) : url;
        let localFile = app.getFile(url);
        return Observable.fromPromise(new Promise((resolve, reject) => {
          localFile.readText().then((data) => {
            try {
              this.cache[url] = JSON.parse(data);
              resolve(this.cache[url]);
            } catch (err) {
              reject(err);         
            }
          }, (err) => {
            reject(err);
          });  
        }));  
      }
    } else {
      // standard remote http request
      return this.http.get(url)
        .map((response: Response) => response.json());  
    }
  }
}
