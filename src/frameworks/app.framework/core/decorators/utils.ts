import {Component, ViewEncapsulation} from 'angular2/core';

import {ViewBroker} from '../services/view-broker';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

const _reflect: any = Reflect;

export class DecoratorUtils {
  public static getConfig(config: any = {}, opts?: any) {
    
    // default directives
    let DIRECTIVES: any[] = [];
    
    // default pipes
    let PIPES: any[] = [TranslatePipe];
    
    // custom decorator options
    if (opts) {
      if (opts.directives) {
        DIRECTIVES.push(...opts.directives); 
      }
      if (opts.pipes) {
        PIPES.push(...opts.pipes); 
      }  
    }
    
    if (config.templateUrl) {
      // correct view for platform target
      config.templateUrl = ViewBroker.TEMPLATE_URL(config.templateUrl);
    }
    
    config.directives = config.directives ? config.directives.concat(DIRECTIVES) : DIRECTIVES;
    config.pipes = config.pipes ? config.pipes.concat(PIPES) : PIPES;
    config.host = config.host || {};
    config.encapsulation = config.encapsulation || ViewEncapsulation.None;
    return config;
  }
  
  public static annotateComponent(cls, config: any = {}, opts?: any) {
    let annotations = _reflect.getMetadata('annotations', cls) || [];
    annotations.push(new Component(DecoratorUtils.getConfig(config, opts)));
    _reflect.defineMetadata('annotations', annotations, cls);
    return cls;
  }
}
