// import all the stuff we need
import * as plugins from './tsbuild.plugins';
import { CompilerOptions } from 'typescript';
export { CompilerOptions, ScriptTarget, ModuleKind } from 'typescript';

/**
 * the default typescript compilerOptions
 */
export const compilerOptionsDefault: CompilerOptions = {
  declaration: true,
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  inlineSourceMap: true,
  noEmitOnError: true,
  outDir: 'dist/',
  module: plugins.typescript.ModuleKind.CommonJS,
  lib: ['lib.es2016.d.ts', 'lib.es2017.d.ts'],
  noImplicitAny: false,
  target: plugins.typescript.ScriptTarget.ES2015
};

export const compilerOptionsWebDefault: CompilerOptions = {
  ...compilerOptionsDefault,
  lib: [...compilerOptionsDefault.lib, 'lib.dom.d.ts']
};

/**
 * merges compilerOptions with the default compiler options
 */
export const mergeCompilerOptions = (customTsOptions: CompilerOptions, argvArg?: any): CompilerOptions => {
  const defaultOptionsToMerge = (() => {
    if (argvArg && argvArg.web) {
      return compilerOptionsWebDefault;
    } else {
      return compilerOptionsDefault;
    }
  })();

  // create merged options
  let mergedOptions: CompilerOptions = {
    ...defaultOptionsToMerge,
    ...customTsOptions
  };

  return mergedOptions;
};

/**
 * the internal main compiler function that compiles the files
 */
export const compiler = (
  fileNames: string[],
  options: plugins.typescript.CompilerOptions,
  argvArg?: any,
): Promise<any[]> => {
  console.log(`Compiling ${fileNames.length} files...`);
  let done = plugins.smartpromise.defer<any[]>();
  let program = plugins.typescript.createProgram(fileNames, options);
  let emitResult = program.emit();

  // implement check only
  /*let emitResult = program.emit(undefined,(args) => {
    console.log(args)
  });*/

  let allDiagnostics = plugins.typescript
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);
  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
      let message = plugins.typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(
        `${plugins.typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`
      );
    }
  });

  let exitCode = emitResult.emitSkipped ? 1 : 0;
  if (exitCode === 0) {
    console.log('TypeScript emit succeeded!');
    done.resolve(emitResult.emittedFiles);
  } else {
    console.error('TypeScript emit failed. Please investigate!');
    process.exit(exitCode);
  }

  return done.promise;
};
