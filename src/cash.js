/*global cash HTMLCollection slice isObject isWindow*/

// ###cache
// Hash that holds the event and display data
cash.cache = {events: {}, display: {}};
// generate a unique id for elements
cash.cid = 0;
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
  this.q = Array.isArray(arg) ? arg : (arg ? ((arg instanceof NodeList || arg instanceof HTMLCollection) ? 
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
  var cid = isWindow(el) ? 'window' : el.cid,
    obj = this.cache[ref];
  if(!cid) el.cid = cid = String(++this.cid);
  obj[cid] || (obj[cid] = ref === 'events' ? {} : undefined);
  return obj;
};
