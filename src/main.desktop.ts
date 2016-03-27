import 'reflect-metadata';
import 'zone.js/dist/zone';
// angular
import {provide} from 'angular2/core';

// config
import {CoreConfigService} from './frameworks/core.framework/index';
CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.DESKTOP;
CoreConfigService.DEBUG.LEVEL_4 = true;

// app
import {WindowService, ConsoleService} from './frameworks/core.framework/index';
import {MultilingualService} from './frameworks/i18n.framework/index';
import {AppConfigService} from './frameworks/app.framework/index';
import {AppComponent} from './components/app/app.component';
import {DESKTOP_APP_PROVIDERS, WindowDesktop} from './frameworks/desktop.framework/index';
import {bootstrap} from './frameworks/desktop.framework/electron/main';
// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfigService.SUPPORTED_LANGUAGES;

bootstrap(AppComponent, [
  provide(WindowService, { useValue: WindowDesktop }),
  provide(ConsoleService, { useValue: console }),
  DESKTOP_APP_PROVIDERS
])
.catch(err => console.error(err));
