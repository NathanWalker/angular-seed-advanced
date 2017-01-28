// libs
import {Component, NgZone, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
// app
import {RouterExtensions} from '../../shared/core/index';
import {IAppState, getNames} from '../../shared/ngrx/index';
import * as nameList from '../../shared/sample/index';
import {SpeechRecognitionService} from '../../shared/core/services/speech-recognition.service';
import {MultilingualService} from '../../shared/i18n/services/multilingual.service';


declare var NSIndexPath, UITableViewScrollPosition;

@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  public names$: Observable<any>;
  public newName: string = '';
  private speechSubscription: Subscription;
  private listening: boolean;

  constructor(private store: Store<IAppState>,
              private speechService: SpeechRecognitionService,
              @Inject(NgZone) private ngZone: NgZone,
              private multiLingualService: MultilingualService,
              public routerext: RouterExtensions) {
    this.names$ = store.let(getNames);
  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.store.dispatch(new nameList.AddAction(this.newName));
    this.newName = '';
    return false;
  }

  readAbout() {
    // Try this in the {N} app
    // {N} can use these animation options
    this.routerext.navigate(['/about'], {
      transition: {
        duration: 1000,
        name: 'slideTop',
      }
    });
  }

  startSpeechRecognition(): void {
    this.listening = true;
    this.newName = '';
    this.speechSubscription = this.speechService.record()
      .finally(() => {
        this.listening = false;
        this.speechService.destroySpeechObject();
      })
      .subscribe(speech => {
        this.ngZone.run(() => {
          this.newName = speech;
          this.speechSubscription.unsubscribe();
        });
      });
  }
}
