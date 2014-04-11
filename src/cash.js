/*global cash HTMLCollection slice isObject isWindow isArray*/

// ###cache
// Hash that holds the event and display data
cash.cache = {events: {}, display: {}};
// generate a unique id for elements
cash._cid_ = 0;
// ###_clearCache_
// Clean up the cache for the given el.
//
// `param` {Element} `el`
// `returns` el
cash._unsetCache_ = function(el) {
  delete this.cache.events[el.getAttribute('data-cid')];
  return el;
};
// ###get
// Return the entire `q` or a particular element located at an index by 
// passing nothing or a number respectively. Note that you can pass a 
// negative number to fetch from the **end** of the `q` (-1 for the last for example).
//
// `param` {number} `i`
// `returns` {array|element}
cash.get = function(i) {
  // intentional coercion 
  return i == null ? this.q : (i > -1 ? this.q[i]: this.q[this.q.length + (i)]);
};
// init
// Breaking from the jQuery pattern, only a singile DOM node or NodeList is
// expected as arguments (though an array is acceptable). The passed in arg
// is normalized into an array and set as $.q. All chainable methods then
// operate on the q.
//
// `param` {element|nodeList|array} `arg`
// `returns` cash
cash.init = function(arg) {
  // base case is already an array, then handle node(List) and falsey
  this.q = isArray(arg) ? arg : (arg ? ((arg instanceof NodeList || arg instanceof HTMLCollection) ? 
    slice.call(arg) : [arg]) : []);
  return this;
};
// ###isObject
// Ye olde toString fallback to see if a passed in argument is an object.
// Really you should test the other cases (Array.isArray for example) but this
// does 'even' the API a little
//
// `param` {*}
// `returns` {bool}
cash.isObject = isObject;
// ###noop
// Empty function
cash.noop = function() {},
// ###setCache
// private.
cash._setCache_ = function(ref, el) {
  var cid = isWindow(el) ? 'window' : el.getAttribute('data-cid'),
    obj = this.cache[ref];
  if(!cid) {cid = String(++this._cid_); el.setAttribute('data-cid', cid);}
  obj[cid] || (obj[cid] = ref === 'events' ? {} : undefined);
  return obj;
};
