// nativescript
import { NativeScriptModule, platformNativeScriptDynamic, onAfterLivesync, onBeforeLivesync } from 'nativescript-angular/platform';

/**
 * Config
 * Seed provided configuration options
 */
import { Config } from './app/frameworks/core/index';

// (required) platform target (allows component decorators to use the right view template)
Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

// (optional) log level - defaults to no logging if not set
Config.DEBUG.LEVEL_4 = true;

// (optional) custom i18n language support
// example of how you can configure your own language sets
// you can use the AppConfig class or build something similar into your own framework
import { AppConfig } from './app/frameworks/sample/services/app-config';
import { MultilingualService } from './app/frameworks/i18n/services/multilingual.service';
MultilingualService.SUPPORTED_LANGUAGES = AppConfig.SUPPORTED_LANGUAGES;

// app
import { NativeModule } from './native.module';

platformNativeScriptDynamic().bootstrapModule(NativeModule);
