/*global isString keys addPx*/

// ###css
// Given a key and a value, or a hash of key:value pairs, set each on the style property of
// each element in the `q`.
// This method does not function as a getter (use getComputedStyle for that).
//
// `param` {string|object} `key`
//
// `param` {string} `val`. Used if `key` is not an object
//
// `returns` cash
cash.css = function(key, val) {
  var ary = isString(key) ? undefined : keys(key),
  set = ary ? function(el) {ary.forEach(function(i) {el.style[i] = addPx(key[i], i);});} :
    function(el) {el.style[key] = addPx(val, key);};
  this.q.forEach(set);
  return this;
};
// ###offset
// Get a hash of key:value pairs: `top`, `left`, `width` and `height` - representing
// the position in the document of the 0th element in the q. This method is a getter only
// (use `css()` as a setter). Takes into consideration the page[X|Y]Offsets for
// `left` and `top` as well as rounds the width and height
//
// `returns` {object}
cash.offset = function() {
  if(!this.q.length) return null;
  var obj = this.q[0].getBoundingClientRect();
  return {
    left: obj.left + window.pageXOffset,
    top: obj.top + window.pageYOffset,
    width: Math.round(obj.width),
    height: Math.round(obj.height)
  };
};
