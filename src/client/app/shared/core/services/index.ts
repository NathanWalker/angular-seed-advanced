// app
import { ConsoleService } from './console.service';
import { LogService } from './log.service';
import { RouterExtensions } from './router-extensions.service';
import { WindowService } from './window.service';
import { AppService } from './app.service';
import { SpeechRecognitionService } from './speech-recognition.service';

export const CORE_PROVIDERS: any[] = [
  AppService,
  ConsoleService,
  LogService,
  RouterExtensions,
  SpeechRecognitionService,
  WindowService,
];

export * from './app.service';
export * from './console.service';
export * from './log.service';
export * from './router-extensions.service';
export * from './speech-recognition.service';
export * from './window.service';
