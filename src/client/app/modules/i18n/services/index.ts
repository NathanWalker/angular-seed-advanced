import { LanguageProviders, MultilingualService } from './multilingual.service';

/**
 * This is located in the i18n folder for organization
 * However these are imported in CoreModule since
 * MultilingualService should be a singleton across entire app
 * lazy-loaded modules or not.
 */
export const MULTILANG_PROVIDERS: any[] = [
  ...LanguageProviders,
  MultilingualService,
];

export * from './multilingual.service';
