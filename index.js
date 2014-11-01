'use strict';

var path = require('path');
var vm = require('vm');
var fs = require('fs');

var fileName = path.join(path.dirname(require.resolve('typescript')), 'typescriptServices.js');
var code = fs.readFileSync(fileName, { encoding: 'utf-8' });
var sandbox = {};
vm.runInNewContext(code, sandbox, 'typescriptServices.js');

module.exports = sandbox;
