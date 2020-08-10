console.log('test');
console.log('test2');

import * as early from '@pushrocks/early';

early.start();
early.stop();

import {anExportedString} from './tocompile2';
console.log(anExportedString);

class test2 {
  test: string[] = [];
  constructor() {
    console.log('hi');
  }
}

const run = async (): Promise<string> => {
  return 'hi';
};
