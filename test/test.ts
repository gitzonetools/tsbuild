import { tap, expect } from '@pushrocks/tapbundle';

import * as tsn from '../ts/index';

let assetfiles: string[] = ['./test/assets/tocompile.ts', './test/assets/tocompile2.ts'];

let assetfiles2 = {
  './test/assets/**/!(*.d.ts|*.js|output)': './test/assets/output'
};

tap.test('should convert files from an array with single files to output', async tools => {
  tsn.compileFileArray(assetfiles, { outDir: './test/assets/output' });
});

tap.test('should convert files from an array with single files to output', async tools => {
  tsn.compileGlobStringObject(assetfiles2);
});

tap.start();
