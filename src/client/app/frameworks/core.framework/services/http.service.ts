import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
* Allows for providing hooks for cross platform dev.
* ie., {N} needs to use file-system api to get local files
*/
@Injectable()
export class HttpService {
  constructor(private http:Http) {
    
  }
  
  public get(url: string): Observable<any> {
    return this.http.get(url)
      .map((response: Response) => response.json());
  }
}
