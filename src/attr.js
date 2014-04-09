/*global cash isString keys*/

// ###attr
// Given a single attribute and value or a hash of them set it/them on each
// element in the `q`. This method does not function as a getter.
//
// `param` {string|object} `key`
// `param` {string} `val`. Used if the `key` is not an object
// `returns` cash
cash.attr = function(key, val) {
  var ary = isString(key) ? undefined : keys(key),
  set = ary ? function(el) {ary.forEach(function(i) {el.setAttribute(i, key[i]);});} :
    function(el) {el.setAttribute(key, val);};
  this.q.forEach(set);
  return this;
};
// ###removeAttr
// Given a single attribute name or an array of them, remove it/them from each
// element in the `q`.
//
// `param` {string|array} `key`
// `returns` cash
cash.removeAttr = function(key) {
  var rem = Array.isArray(key) ? function(el) {key.forEach(function(a) {el.removeAttribute(a);});} :
    function(el) {el.removeAttribute(key);};
  this.q.forEach(rem);
  return this;
};
