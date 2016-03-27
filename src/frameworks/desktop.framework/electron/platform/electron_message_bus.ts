import {
  MessageBus,
  MessageBusSource,
  MessageBusSink
} from 'angular2/src/web_workers/shared/message_bus';
import {NgZone, EventEmitter, Injectable} from 'angular2/core';

/**
 * Typescript Implementation of MessageBus for use in electron apps
 */

export const ELECTRON_WORKER = '__ELECTRON_WORKER';
export const ELECTRON_CLIENT = '__ELECTRON_CLIENT';
export const ELECTRON_READY = '__ELECTRON_READY';

const ELECTRON_CHANNEL = '__ELECTRON_CHANNEL';

@Injectable()
export class ElectronMessageBus implements MessageBus {
  constructor(public sink: ElectronMessageBusSink,
              public source: ElectronMessageBusSource,
              private env: string = ELECTRON_CLIENT) {}

  attachToZone(zone: NgZone): void {
    this.source.attachToZone(zone);
    this.sink.attachToZone(zone);
  }

  initChannel(channel: string, runInZone: boolean = false): void {
    this.source.initChannel(channel, runInZone);
    this.sink.initChannel(channel, runInZone);
  }

  from(channel: string): EventEmitter<any> { return this.source.from(channel); }

  to(channel: string): EventEmitter<any> { return this.sink.to(channel); }
}

export class ElectronMessageBusSink implements MessageBusSink {
  private _zone: NgZone;
  private _channels: Map<string, ElectronMessageChannel> =
      new Map<string, ElectronMessageChannel>();
  private _messageBuffer: Array<Object> = [];

  constructor(private _ipc: any) {}

  attachToZone(zone: NgZone): void {
    this._zone = zone;
    this._zone.onMicrotaskEmpty.subscribe(() => { this._handleOnEventDone(); });
  }

  initChannel(channel: string, runInZone: boolean = true): void {
    if (this._channels.has(channel)) {
      throw new Error(`${channel} has already been initialized`);
    }
    let _channel = new ElectronMessageChannel(new EventEmitter(), runInZone);
    this._channels.set(channel, _channel);
    _channel.emitter.subscribe((data: any) => {
      var message = {channel : channel, message : data};

      if (runInZone) {
        this._messageBuffer.push(message);
      } else {
        this._sendMessages([ message ]);
      }
    });
  }

  to(channel: string): EventEmitter<any> {
    if (!this._channels.has(channel)) {
      throw new Error(`${channel} does not exist!`);
    }
    return this._channels.get(channel).emitter;
  }

  private _sendMessages(messages: any[]) {
    if (this._ipc.sendChannel) {
      this._ipc.sendChannel(ELECTRON_CHANNEL, messages);
    } else {
      this._ipc.send(ELECTRON_CHANNEL, messages);
    }
  }
  private _handleOnEventDone() {
    if (this._messageBuffer.length > 0) {
      this._sendMessages(this._messageBuffer);
      this._messageBuffer = [];
    }
  }
}

export class ElectronMessageBusSource implements MessageBusSource {
  private _zone: NgZone;
  private _channels: Map<string, ElectronMessageChannel> =
      new Map<string, ElectronMessageChannel>();

  constructor(private _ipc?: any) {
    console.log(`ElectronMessageBusSource constructed!`);
    this._ipc.on(ELECTRON_CHANNEL, (ev:any, data:any) => this._handleMessages(data || ev));
  }
  attachToZone(zone: NgZone) { this._zone = zone; }

  initChannel(channel: string, runInZone: boolean = true) {

    if (this._channels.has(channel)) {
      throw new Error(`${channel} has already been initialized`);
    }

    let emitter = new EventEmitter();
    let channelInfo = new ElectronMessageChannel(emitter, runInZone);
    this._channels.set(channel, channelInfo);
  }

  from(channel: string): EventEmitter<any> {
    if (this._channels.has(channel)) {
      return this._channels.get(channel).emitter;
    } else {
      throw new Error(
          `${channel} is not set up. Did you forget to call initChannel?`);
    }
  }

  private _handleMessages(messages: any[]): void {
    for (var i = 0; i < messages.length; i++) {
      this._handleMessage(messages[i]);
    }
  }

  private _handleMessage(data: any): void {
    var channel = data.channel;
    if (this._channels.has(channel)) {
      var channelInfo = this._channels.get(channel);
      this._zone.run(() => { channelInfo.emitter.next(data.message); });
    } else {
      throw new Error('unhandled message!');
    }
  }
}

class ElectronMessageChannel {
  constructor(public emitter: EventEmitter<any>, public runInZone: boolean) {}
}
