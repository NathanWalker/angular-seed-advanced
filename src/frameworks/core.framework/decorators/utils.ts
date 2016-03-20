// angular
import {Component, ChangeDetectionStrategy} from 'angular2/core';

// libs
import {TranslatePipe} from 'ng2-translate/ng2-translate';

// app
import {CoreConfigService, ViewBrokerService} from '../index';

const _reflect: any = Reflect;

export class DecoratorUtils {
  public static getMetadata(metadata: any = {}, opts?: any) {

    /**
     * The following allow default component metadata to be configured
     * For instance, here we make `TranslatePipe` available for all our components
     */
    // default directives
    let DIRECTIVES: any[] = [];
    // default pipes
    let PIPES: any[] = [TranslatePipe];
    // default providers
    let PROVIDERS: any[] = [];
    // default viewProviders
    let VIEW_PROVIDERS: any[] = [];      
    
    // custom decorator options
    if (opts) {
      if (opts.directives) {
        DIRECTIVES.push(...opts.directives); 
      }
      if (opts.pipes) {
        PIPES.push(...opts.pipes); 
      }
      if (opts.providers) {
        PROVIDERS.push(...opts.providers); 
      }
      if (opts.viewProviders) {
        VIEW_PROVIDERS.push(...opts.viewProviders); 
      }
    }
    
    if (metadata.templateUrl) {
      // correct view for platform target
      metadata.templateUrl = ViewBrokerService.TEMPLATE_URL(metadata.templateUrl);
    }
    
    if (metadata.styleUrls && CoreConfigService.IS_MOBILE_NATIVE()) {
      // {N} doesn't support all css properties, therefore remove styleUrls to be safe
      delete metadata.styleUrls;
    }
    
    metadata.directives = metadata.directives ? metadata.directives.concat(DIRECTIVES) : DIRECTIVES;
    metadata.pipes = metadata.pipes ? metadata.pipes.concat(PIPES) : PIPES;
    metadata.providers = metadata.providers ? metadata.providers.concat(PROVIDERS) : PROVIDERS;
    metadata.viewProviders = metadata.viewProviders ? metadata.viewProviders.concat(VIEW_PROVIDERS) : VIEW_PROVIDERS;
    metadata.host = metadata.host || {};
    
    if (metadata.changeDetection) {
      metadata.changeDetection = metadata.changeDetection;
    } else {
      // default OnPush
      metadata.changeDetection = ChangeDetectionStrategy.OnPush;
    }
    
    if (metadata.encapsulation) {
      metadata.encapsulation = metadata.encapsulation;
    }
    
    // initialize anything 
    if (metadata.init) {
      metadata.init();
    }   

    return metadata;
  }
  
  public static annotateComponent(cls: any, metadata: any = {}, opts?: any) {
    let annotations = _reflect.getMetadata('annotations', cls) || [];
    annotations.push(new Component(DecoratorUtils.getMetadata(metadata, opts)));
    _reflect.defineMetadata('annotations', annotations, cls);
    return cls;
  }
}
