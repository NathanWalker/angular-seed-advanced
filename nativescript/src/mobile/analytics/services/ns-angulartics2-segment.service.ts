// angular
import { Injectable } from '@angular/core';

// libs
import { Angulartics2, Angulartics2Segment } from 'angulartics2';

// TODO: This is a wip at the moment
// Will implement native segment sdk soon
// https://github.com/NathanWalker/nativescript-segment/issues/1

@Injectable()
export class NSAngulartics2Segment extends Angulartics2Segment {

  constructor(angulartics2: Angulartics2) {
    super(angulartics2);
    angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));
    angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));
    angulartics2.setUserProperties.subscribe((x: any) => this.setUserProperties(x));
    angulartics2.setUserPropertiesOnce.subscribe((x: any) => this.setUserProperties(x));
  }

  public pageTrack(path: string, location: any) {
    // TODO
  }

  public eventTrack(action: string, properties: any) {
    // TODO
  }

  public setUserProperties(properties: any) {
    // TODO
  }
}
