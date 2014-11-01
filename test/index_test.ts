/// <reference path="../index.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

require('./test_helper');

import typeScriptServices = require('typescript-services-api');

describe('typescript-services-api', () => {
  it('should export the "ts" object', function() {
    assert(typeScriptServices.ts);
  });

  it('should export the "TypeScript" object', function() {
    assert(typeScriptServices.TypeScript);
  });
});
