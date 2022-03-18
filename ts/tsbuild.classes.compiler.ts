// import all the stuff we need
import * as plugins from './tsbuild.plugins.js';
import { CompilerOptions, ScriptTarget, ModuleKind } from './tsbuild.exports.js';


/**
 * the default typescript compilerOptions
 */
export const compilerOptionsDefault: CompilerOptions = {
  declaration: true,
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  inlineSourceMap: true,
  noEmitOnError: true,
  outDir: 'dist_ts/',
  module: plugins.typescript.ModuleKind.ES2020,
  target: plugins.typescript.ScriptTarget.ES2020,
  moduleResolution: plugins.typescript.ModuleResolutionKind.Node12,
  lib: ['lib.dom.d.ts'],
  noImplicitAny: true,
  esModuleInterop: true,
  importsNotUsedAsValues: plugins.typescript.ImportsNotUsedAsValues.Preserve
};

/**
 * merges compilerOptions with the default compiler options
 */
export const mergeCompilerOptions = (
  customTsOptions: CompilerOptions,
  argvArg?: any
): CompilerOptions => {
  // create merged options
  const mergedOptions: CompilerOptions = {
    ...compilerOptionsDefault,
    ...customTsOptions,
    ...argvArg && argvArg.skiplibcheck ? {
      skipLibCheck: true
    } : {},
    ...argvArg && argvArg.allowimplicitany ? {
      noImplicitAny: false
    } : {},
    ...argvArg && argvArg.commonjs ? {
      module: plugins.typescript.ModuleKind.CommonJS,
      moduleResolution: plugins.typescript.ModuleResolutionKind.NodeJs,
    } : {},
  };

  console.log(mergedOptions)

  return mergedOptions;
};

/**
 * the internal main compiler function that compiles the files
 */
export const compiler = async (
  fileNames: string[],
  options: plugins.typescript.CompilerOptions,
  argvArg?: any
): Promise<any[]> => {
  if (options.skipLibCheck) {
    console.log('? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?')
    console.log('You are skipping libcheck... Is that really wanted?');
    console.log('? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?')
    await plugins.smartdelay.delayFor(5000);
  }
  console.log(`Compiling ${fileNames.length} files...`);
  const done = plugins.smartpromise.defer<any[]>();
  const program = plugins.typescript.createProgram(fileNames, options);
  const emitResult = program.emit();

  // implement check only
  /*let emitResult = program.emit(undefined,(args) => {
    console.log(args)
  });*/

  const allDiagnostics = plugins.typescript
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);
  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
      const message = plugins.typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(
        `${plugins.typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`
      );
    }
  });

  const exitCode = emitResult.emitSkipped ? 1 : 0;
  if (exitCode === 0) {
    console.log('TypeScript emit succeeded!');
    done.resolve(emitResult.emittedFiles);
  } else {
    console.error('TypeScript emit failed. Please investigate!');
    process.exit(exitCode);
  }

  return done.promise;
};
