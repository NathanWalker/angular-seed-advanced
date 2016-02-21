import {join} from 'path';
import {APP_SRC} from './config';

export * from './utils/template_injectables';
export * from './utils/template_locals';
export * from './utils/server';
export * from './utils/tasks_tools';


export function tsProjectFn(plugins) {
  return plugins.typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
}

export const customIgnore: string[] = [
  '!' + join(APP_SRC, 'app/**/*.ts'),
  '!' + join(APP_SRC, 'node_modules/**/*.ts')
];
