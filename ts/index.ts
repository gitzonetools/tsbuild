export * from './tsbuild.exports';

import * as tsbuild from './tsbuild.exports';

if (process.env.CLI_CALL_TSBUILD === 'true') {
  tsbuild.compileGlobStringObject({
    './ts/**/*.ts': './dist'
  });
}
