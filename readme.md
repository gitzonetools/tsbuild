# @gitzone/tsbuild
TypeScript nightly to easily make use of latest features

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@gitzone/tsbuild)
* [gitlab.com (source)](https://gitlab.com/gitzone/tsbuild)
* [github.com (source mirror)](https://github.com/gitzone/tsbuild)
* [docs (typedoc)](https://gitzone.gitlab.io/tsbuild/)

## Status for master
[![pipeline status](https://gitlab.com/gitzone/tsbuild/badges/master/pipeline.svg)](https://gitlab.com/gitzone/tsbuild/commits/master)
[![coverage report](https://gitlab.com/gitzone/tsbuild/badges/master/coverage.svg)](https://gitlab.com/gitzone/tsbuild/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@gitzone/tsbuild.svg)](https://www.npmjs.com/package/@gitzone/tsbuild)
[![Known Vulnerabilities](https://snyk.io/test/npm/@gitzone/tsbuild/badge.svg)](https://snyk.io/test/npm/@gitzone/tsbuild)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

Tsn uses the **next** tagged npm version of typescript

```typescript
import * as tsn from 'tsn';

let myGlobStringObject = {
  './myTsFolder/**/*.ts': './myDestinationFolder/',
  './someOtherTsFolder/**/*.ts': './myOtherDestinationFolder/'
};

let tsOptions = {
  target: tsn.ScriptTarget.ES2015,
  module: tsn.ModuleKind.CommonJS
};

/*
note: since this only works in code, here are the target numbers
enum ScriptTarget {
        ES3 = 0,
        ES5 = 1,
        ES2015 = 2,
        ES2016 = 3,
        ES2017 = 4,
        ESNext = 5,
        Latest = 5,
}

and here are the module kinds
enum ModuleKind {
        None = 0,
        CommonJS = 1,
        AMD = 2,
        UMD = 3,
        System = 4,
        ES2015 = 5,
    }
*/

let myCwd = process.cwd();

tsn.compileGlobStringObject(
  myGlobStringObject, // the glob string object describing from where to compile what to where
  tsOptions, // the options for TypeScript
  myCwd // a custom cwd, optional, defaults to process.cwd()
);
```

[![npm](https://push.rocks/assets/repo-header.svg)](https://push.rocks)

## Contribution

We are always happy for code contributions. If you are not the code contributing type that is ok. Still, maintaining Open Source repositories takes considerable time and thought. If you like the quality of what we do and our modules are useful to you we would appreciate a little monthly contribution: You can [contribute one time](https://lossless.link/contribute-onetime) or [contribute monthly](https://lossless.link/contribute). :)

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
