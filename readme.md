# @gitzone/tsbuild
TypeScript nightly to easily make use of latest features

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@gitzone/tsbuild)
* [gitlab.com (source)](https://gitlab.com/gitzone/tsbuild)
* [github.com (source mirror)](https://github.com/gitzone/tsbuild)
* [docs (typedoc)](https://gitzone.gitlab.io/tsbuild/)

## Status for master

Status Category | Status Badge
-- | --
GitLab Pipelines | [![pipeline status](https://gitlab.com/gitzone/tsbuild/badges/master/pipeline.svg)](https://lossless.cloud)
GitLab Pipline Test Coverage | [![coverage report](https://gitlab.com/gitzone/tsbuild/badges/master/coverage.svg)](https://lossless.cloud)
npm | [![npm downloads per month](https://badgen.net/npm/dy/@gitzone/tsbuild)](https://lossless.cloud)
Snyk | [![Known Vulnerabilities](https://badgen.net/snyk/gitzone/tsbuild)](https://lossless.cloud)
TypeScript Support | [![TypeScript](https://badgen.net/badge/TypeScript/>=%203.x/blue?icon=typescript)](https://lossless.cloud)
node Support | [![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
Code Style | [![Code Style](https://badgen.net/badge/style/prettier/purple)](https://lossless.cloud)
PackagePhobia (total standalone install weight) | [![PackagePhobia](https://badgen.net/packagephobia/install/@gitzone/tsbuild)](https://lossless.cloud)
PackagePhobia (package size on registry) | [![PackagePhobia](https://badgen.net/packagephobia/publish/@gitzone/tsbuild)](https://lossless.cloud)
BundlePhobia (total size when bundled) | [![BundlePhobia](https://badgen.net/bundlephobia/minzip/@gitzone/tsbuild)](https://lossless.cloud)
Platform support | [![Supports Windows 10](https://badgen.net/badge/supports%20Windows%2010/yes/green?icon=windows)](https://lossless.cloud) [![Supports Mac OS X](https://badgen.net/badge/supports%20Mac%20OS%20X/yes/green?icon=apple)](https://lossless.cloud)

## Usage

Tsn uses the **next** tagged npm version of typescript

```typescript
import * as tsn from 'tsn';

let myGlobStringObject = {
  './myTsFolder/**/*.ts': './myDestinationFolder/',
  './someOtherTsFolder/**/*.ts': './myOtherDestinationFolder/',
};

let tsOptions = {
  target: tsn.ScriptTarget.ES2015,
  module: tsn.ModuleKind.CommonJS,
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
