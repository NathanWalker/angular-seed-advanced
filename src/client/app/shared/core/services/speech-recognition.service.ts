import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import * as _ from 'lodash';
import {LogService} from './log.service';
import {WindowService} from './window.service';

@Injectable()
export class SpeechRecognitionService {
  speechRecognition: any;

  constructor(private windowService: WindowService, private logService: LogService) {

  }

  record(): Observable<string> {
    return Observable.create(observer => {
      let webkitSpeechRecognition = this.windowService.webkitSpeechRecognition;
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.continuous = true;
      this.speechRecognition.lang = 'en-us';
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = speech => {
        let term: string = '';
        if (speech.results) {
          let result = speech.results[speech.resultIndex];
          let transcript = result[0].transcript;
          if (result.isFinal) {
            if (result[0].confidence < 0.3) {
              this.logService.error('Unrecognized result');
            } else {
              term = _.trim(transcript);
              observer.next(term);
            }
          }
        }
      };

      this.speechRecognition.onerror = error => {
        observer.error(error);
      };

      this.speechRecognition.onend = () => {
        observer.complete();
        this.logService.info('Speech recognition terminated');
      };

      this.speechRecognition.start();
      //trigger the subscriber to show Listening
      this.logService.info('Speech recognition initiated');
    });
  }

  destroySpeechObject(): void {
    if (this.speechRecognition) {
      this.speechRecognition.stop();
    }
  }

}
