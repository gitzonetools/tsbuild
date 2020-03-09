import * as plugins from './tsbuild.plugins';
import * as tsbuild from './tsbuild.exports';

const tsbuildCli = new plugins.smartcli.Smartcli();

/**
 * the standard task compiles anything in ts/ directory to dist directory
 */
tsbuildCli.standardTask().subscribe(async argvArg => {
  if (process.env.CLI_CALL_TSBUILD === 'true') {
    tsbuild.compileGlobStringObject(
      {
        './ts/**/*.ts': './dist'
      },
      {},
      process.cwd(),
      argvArg
    );
  }
});

/**
 * the custom command compiles any customDir to dist_customDir
 */
tsbuildCli.addCommand('custom').subscribe(async argvArg => {
  const listedDirectories = argvArg._;
  listedDirectories.shift();
  const compilationCommandObject: { [key: string]: string } = {};
  for (const directory of listedDirectories) {
    compilationCommandObject[`./${directory}/**/*.ts`] = `./dist_${directory}`;
  }
  await tsbuild.compileGlobStringObject(compilationCommandObject, {}, process.cwd(), argvArg);
});

tsbuildCli.addCommand('element').subscribe(async argvArg => {
  await tsbuild.compileGlobStringObject({
    "./ts_web": "dist_ts_web"
  }, {}, process.cwd(), {web: true});
});

tsbuildCli.startParse();
