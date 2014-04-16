/*global isWindow isDocument addPx*/

// ###height
// Given a value this method is a setter for each element in the q.
// If the arg is truthy and a number it is converted to a string with 'px'
// added, if it is a string nothing is added.
// Minus that, it returns the height of the 0th item in the q;
//
// `param` {number|string} `val`. Optional value to be set
// `returns` {number|object} The height if a getter, cash if a setter
cash.height = function(val) {return this._hw_('height', val);};
// ###_hw_
// Abstracted logic for the height and width operations
// `private`
cash._hw_ = function(key, val) {
  var obj = {
    height: {w:'innerHeight',d:'scrollHeight'},
    width: {w:'innerWidth',d:'scrollWidth'}
    }, node = this.q[0], d = isDocument(node) ? node.documentElement : null, 
    w = isWindow(node) ? node: null, type = obj[key], o;
  if(!val) return node ? w ? w[type.w] : d ? d[type.d] : (o = this.offset()) && o[key] : 0;
  this.q.forEach(function(el) {
    el.style[key] = addPx(val);
  });
  return this;
};
// ###width
// Given a value this method is a setter for each element in the q.
// If the arg is truthy and a number it is converted to a string with 'px'
// added, if it is a string nothing is added.
// Minus that, it returns the width of the 0th item in the q;
//
// `param` {number|string} `val`. Optional value to be set
// `returns` {number|object} The height if a getter, cash if a setter
cash.width = function(val) {return this._hw_('width', val);};
