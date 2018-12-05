import * as plugins from './tsbuild.plugins';
import * as tsbuild from './tsbuild.exports';

const tsbuildCli = new plugins.smartcli.Smartcli();

tsbuildCli.standardTask().subscribe(argvArg => {
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
