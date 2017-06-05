// ES5 shims for Function.prototype.bind, Object.prototype.keys, etc.
require('core-js/es5');
// shim for es6 Object.assign
require('core-js/fn/object/assign');
// Replace ./src/js with the directory of your application code and
// make sure the file name regexp matches your test files.
var context = require.context('./src', true, /\.spec\.js$/);
context.keys().forEach(context);