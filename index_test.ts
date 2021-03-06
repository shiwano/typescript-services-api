/// <reference path="./index.d.ts" />
/// <reference path="./typings/tsd.d.ts" />

require('source-map-support').install();

import assert = require('power-assert');
import typeScriptServices = require('typescript-services-api');

interface INonInstantiatedTest1 extends typeScriptServices.ts.CompilerHost {}
interface INonInstantiatedTest2 extends typeScriptServices.TypeScript.ISpan {}

describe('typescript-services-api', () => {
  it('should export the "ts" module', () => {
    assert(typeScriptServices.ts);
  });

  it('should export the "TypeScript" module', () => {
    assert(typeScriptServices.TypeScript);
  });
});
