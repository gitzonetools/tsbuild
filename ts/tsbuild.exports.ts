import * as plugins from './tsbuild.plugins';
import { compiler, CompilerOptions, mergeCompilerOptions } from './tsbuild.classes.compiler';

export * from './tsbuild.classes.compiler';

/**
 * compile am array of absolute file paths
 */
export let compileFileArray = (
  fileStringArrayArg: string[],
  compilerOptionsArg: CompilerOptions = {},
  argvArg?: any,
): Promise<any[]> => {
  return compiler(fileStringArrayArg, mergeCompilerOptions(compilerOptionsArg, argvArg), argvArg);
};

/**
 * compile advanced glob configurations
 * @param globStringArrayArg a array of glob strings
 * {
 *     './some/origin/folder/**\/*.ts': './some/destination/folder'
 * }
 */
export let compileGlobStringObject = async (
  globStringObjectArg: any,
  tsOptionsArg: CompilerOptions = {},
  cwdArg: string = process.cwd(),
  argvArg?: any,
) => {
  let compiledFiles = [];
  for (const keyArg in globStringObjectArg) {
    if(globStringObjectArg[keyArg]) {
      console.log(
        `TypeScript assignment: transpile from ${keyArg} to ${globStringObjectArg[keyArg]}`
      );
      const fileTreeArray = await plugins.smartfile.fs.listFileTree(cwdArg, keyArg);
      let absoluteFilePathArray: string[] = plugins.smartpath.transform.toAbsolute(
        fileTreeArray,
        cwdArg
      );
      let destDir: string = plugins.smartpath.transform.toAbsolute(
        globStringObjectArg[keyArg],
        cwdArg
      );
      tsOptionsArg = {
        ...tsOptionsArg,
        outDir: destDir
      };
      compiledFiles = compiledFiles.concat(
        compiledFiles,
        await compileFileArray(absoluteFilePathArray, tsOptionsArg, argvArg)
      );
    }
  }
  return compiledFiles;
};
