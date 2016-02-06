import application = require('application');
import {LocationStrategy} from 'angular2/router';
import {NgZone, Inject, forwardRef} from 'angular2/core';

interface LocationState { 
    state: any;
    title: string;
    url: string;
    queryParams: string;
}
    
export class NSLocationStrategy extends LocationStrategy {
    private states = new Array<LocationState>();
    private popStateCallbacks = new Array<(_: any) => any>();
    private ngZone: NgZone;
    constructor(@Inject(forwardRef(() => NgZone)) zone: NgZone) {
        super();

        this.ngZone = zone;
        if(application.android) {
          application.android.on('activityBackPressed', (args: application.AndroidActivityBackPressedEventData) => {
            this.ngZone.run(() => {
              if (this.states.length > 1) {
                this.back();
                args.cancel = true;
              }
            });
          });
        }
    }
    
    path(): string {
        console.log('--[NSLocationStrategy].path()');
        if(this.states.length > 0) {
            return this.states[this.states.length - 1].url;
        }
        return '/';
    }
    prepareExternalUrl(internal: string): string {
        console.log('--[NSLocationStrategy].prepareExternalUrl() internal: ' + internal);
        return internal;
    }
    pushState(state: any, title: string, url: string, queryParams: string): void {
        console.log(`--[NSLocationStrategy].pushState state: ${state}, title: ${title}, url: ${url}, queryParams: ${queryParams}`);

        this.states.push({
            state: state, 
            title: title, 
            url: url, 
            queryParams: queryParams });
            
    }
    replaceState(state: any, title: string, url: string, queryParams: string): void {
        console.log(`--[NSLocationStrategy].replaceState state: ${state}, title: ${title}, url: ${url}, queryParams: ${queryParams}`);

        this.states.pop();
        this.states.push({
            state: state, 
            title: title, 
            url: url, 
            queryParams: queryParams });
    }
    forward(): void {
        console.log('--[NSLocationStrategy].forward');
        throw new Error('Not implemented');
    }
    back(): void {
        console.log('--[NSLocationStrategy].back');

        var state = this.states.pop();
        this.callPopState(state, true);
    }
    onPopState(fn: (_: any) => any): void {
        console.log('--[NSLocationStrategy].onPopState');
        this.popStateCallbacks.push(fn);
    }
    getBaseHref(): string {
        console.log('--[NSLocationStrategy].getBaseHref()');
        return '';
    }

    private callPopState(state:LocationState, pop: boolean = true) {
       var change = { url: state.url, pop: pop};
        for(var fn of this.popStateCallbacks){
            fn(change);
        }
    }
}
