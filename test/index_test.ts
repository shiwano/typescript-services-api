/// <reference path="../index.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

require('./test_helper');

import typeScriptServices = require('typescript-services-api');

describe('typescript-services-api', () => {
  it('should export the "ts" module', () => {
    assert(typeScriptServices.ts);
  });

  it('should export the "TypeScript" module', () => {
    assert(typeScriptServices.TypeScript);
  });
});
