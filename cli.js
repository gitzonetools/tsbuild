#!/usr/bin/env node
process.env.CLI_CALL_TSBUILD = 'true'
var index = require("./dist_ts/index.js");
