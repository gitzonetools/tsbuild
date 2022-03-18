import { tap, expect, expectAsync } from '@pushrocks/tapbundle';

import * as tsbuild from '../ts/index.js';

let assetfiles: string[] = ['./test/assets/tocompile.ts', './test/assets/tocompile2.ts'];

let assetfiles2 = {
  './test/assets/**/!(*.d.ts|*.js|output)': './test/assets/output',
};

tap.test('should convert files from an array with single files to output', async (tools) => {
  tsbuild.compileFileArray(assetfiles, { outDir: './test/assets/output' });
});

tap.test('should convert files from an array with single files to output', async (tools) => {
  tsbuild.compileGlobStringObject(assetfiles2);
});

tap.start();
