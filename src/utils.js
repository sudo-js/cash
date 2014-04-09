/*global slice keys*/

// ###deserialize
// Given a 'paramaterized' string, convert it to a hash and return it
//
// `param` {string} `str`
// `returns` {object}
cash.deserialize = function(str) {
  var obj = {}, ary;
  str.split('&').forEach(function(spl) {
    if(spl) {
      ary = spl.split('=');
      obj[decodeURIComponent(ary[0])] = decodeURIComponent(ary[1]);
    }
  });
  return obj;
};
// ###extend
// Copy the (non-inherited) key:value pairs from <n> source objects to a single target object.
//
// `params` {objects} A target object followed by <n> source objects
// `returns` {object} A single object
cash.extend = function() {
  var args = slice.call(arguments), targ = args.shift(), obj;
  function fn(k) {targ[k] = obj[k];}
  // iterate over each passed in obj remaining
  for(; args.length && (obj = args.shift());) {keys(obj).forEach(fn);}
  return targ;
};
// ###matches
// Unfortunately the matchesSelector methods are all hidden behind prefixes ATM.
// set the useable one, if not, then return the bool.
//
// `param` {element} `el`. A DOM 1 nodetype
// `param` {string}  `sel`. A CSS selector
// `returns` {bool}
cash.matches = function(el, sel) {
  if (el.nodeType !== 1) return false;
  // normalize the native selector match fn until all the prefixes are dropped
  if(!this._matchesSelector_) {
    this._matchesSelector_ = el.webkitMatchesSelector || el.mozMatchesSelector ||
    el.msMatchesSelector || el.oMatchesSelector || el.matchesSelector;
  }
  return this._matchesSelector_.call(el, sel);
};
// ###serialize
// Given a hash of data, convert it to a 'paramaterized' string and return it.
//
// `param` {object} `obj`
// `returns` {string}
cash.serialize = function(obj) {
  var ary = [];
  keys(obj).forEach(function(key) {
    ary.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
  });
  return ary.join('&');
};
