// angular
import {Component, ChangeDetectionStrategy} from '@angular/core';

// libs
import {TranslatePipe} from 'ng2-translate/ng2-translate';

// app
import {ViewBrokerService} from '../index';

declare var Reflect: any;
const _reflect: any = Reflect;

export class DecoratorUtils {
  public static getMetadata(metadata: any = {}, customDecoratorMetadata?: any) {

    /**
     * The following allows default component metadata to be configured
     * For instance, here we make `TranslatePipe` available for all our components
     */
    // default directives
    let DIRECTIVES: any[] = [];
    // default pipes
    let PIPES: any[] = [TranslatePipe];

    // custom decorator options
    if (customDecoratorMetadata) {
      if (customDecoratorMetadata.directives) {
        DIRECTIVES.push(...customDecoratorMetadata.directives);
      }
      if (customDecoratorMetadata.pipes) {
        PIPES.push(...customDecoratorMetadata.pipes);
      }
    }

    if (metadata.templateUrl) {
      // correct view for platform target
      metadata.templateUrl = ViewBrokerService.TEMPLATE_URL(metadata.templateUrl);
    }

    if (metadata.styleUrls) {
      // correct view for platform target
      metadata.styleUrls = ViewBrokerService.STYLE_URLS(metadata.styleUrls);
    }

    metadata.directives = metadata.directives ? metadata.directives.concat(DIRECTIVES) : DIRECTIVES;
    metadata.pipes = metadata.pipes ? metadata.pipes.concat(PIPES) : PIPES;

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

  public static annotateComponent(cls: any, metadata: any = {}, customDecoratorMetadata?: any) {
    let annotations = _reflect.getMetadata('annotations', cls) || [];
    annotations.push(new Component(DecoratorUtils.getMetadata(metadata, customDecoratorMetadata)));
    _reflect.defineMetadata('annotations', annotations, cls);
    return cls;
  }
}
