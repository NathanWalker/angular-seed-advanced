import 'reflect-metadata';
import * as ts from 'typescript';
import * as tsc from '@angular/tsc-wrapped';
import { argv } from 'yargs';
import { join } from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { CodeGenerator } from '@angular/compiler-cli';

import Config from '../../config';

function codegen(
    ngOptions: tsc.AngularCompilerOptions, cliOptions: tsc.NgcCliOptions, program: ts.Program,
    host: ts.CompilerHost) {
  return CodeGenerator.create(ngOptions, cliOptions, program, host).codegen();
}

const copyFile = (name: string, from: string, to: string, mod: any = (f: string) => f) => {
  const file = readFileSync(join(from, name));
  writeFileSync(join(to, name), mod(file.toString()));
};

export = (done: any) => {
  // Note: dirty hack until we're able to set config easier
  copyFile('tsconfig.json', Config.TMP_DIR, join(Config.TMP_DIR, Config.BOOTSTRAP_DIR), (content: string) => {
    const parsed = JSON.parse(content);
    parsed.files = parsed.files || [];
    parsed.files.push('main.web.ts');
    return JSON.stringify(parsed, null, 2);
  });
  const args = argv;

  // If a translation, tell the compiler
  if(args.lang) {
    args['i18nFile'] = `./src/client/assets/locale/messages.${args.lang}.xlf`;
    args['locale'] = args.lang;
    args['i18nFormat'] = 'xlf';
  }

  const cliOptions = new tsc.NgcCliOptions(args);
  tsc.main(join(Config.TMP_DIR, Config.BOOTSTRAP_DIR), cliOptions, codegen)
    .then(done)
    .catch(e => {
      console.error(e.stack);
      console.error('Compilation failed');
      process.exit(1);
    });
};
