// nativescript
import { NativeScriptModule, platformNativeScriptDynamic } from 'nativescript-angular';

/**
 * Config
 * Seed provided configuration options
 */
import { Config } from './app/frameworks/core/index';
import { Page } from 'ui/page';
Config.PageClass = Page;

// (required) platform target (allows component decorators to use the right view template)
Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;
Config.DEBUG.LEVEL_4 = true;

// sample config (extra)
import { AppConfig } from './app/frameworks/sample/services/app-config';
import { MultilingualService } from './app/frameworks/i18n/services/multilingual.service';
// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfig.SUPPORTED_LANGUAGES;

// app
import { NativeModule } from './native.module';

platformNativeScriptDynamic().bootstrapModule(NativeModule);
