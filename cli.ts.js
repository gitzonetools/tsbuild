#!/usr/bin/env node
process.env.CLI_CALL_TSBUILD = 'true';
require('@gitzone/tsrun');
require('./ts/index');
