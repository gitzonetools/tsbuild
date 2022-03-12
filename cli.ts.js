#!/usr/bin/env node
process.env.CLI_CALL = 'true';
import * as tsrun from '@gitzone/tsrun';
tsrun.runPath('./cli.ts.child.js');