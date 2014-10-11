/*global cash HTMLCollection slice isObject isWindow isArray isDocument*/

// ###cache
// Hash that holds the event and display data
cash.cache = {events: {}, display: {}};
// generate a unique id for elements
cash._cid_ = 0;
// ###get
// Return the entire `q` or a particular element located at an index by 
// passing nothing or a number respectively. Note that you can pass a 
// negative number to fetch from the **end** of the `q` (-1 for the last for example).
//
// `param` {number} `i`
//
// `returns` {array|element}
cash.get = function(i) {
  // intentional coercion 
  return i == null ? this.q : (i > -1 ? this.q[i]: this.q[this.q.length + (i)]);
};
// fetch the unique identifier for this element
cash._getCid_ = function(el) {
  return isWindow(el) ? 'window' : isDocument(el) ? 'document' : el.getAttribute('cid');
};
// ###getUid
// Return a unique identifier via the _cid_ with an optional passed in prefix
//
// `param` {string} `pre` Optional prefix for the identifier
//
// `returns` {string}
cash.getUid = function(pre) {
  var n = ++this._cid_;
  return pre ? pre + n : String(n);
};
// init
// Breaking from the jQuery pattern, only a singile DOM node or NodeList is
// expected as arguments (though an array is acceptable). The passed in arg
// is normalized into an array and set as $.q. All chainable methods then
// operate on the q.
//
// `param` {element|nodeList|array} `arg`
//
// `returns` cash
cash.init = function(arg) {
  arg || (arg = []);
  this.q = isArray(arg) ? arg : 
    (arg instanceof NodeList || arg instanceof HTMLCollection) ? slice.call(arg) : [arg];
  return this;
};
// ###isObject
// Ye olde toString fallback to see if a passed in argument is an object.
// Really you should test the other cases (Array.isArray for example) but this
// does 'even' the API a little
//
// `param` {*}
//
// `returns` {bool}
cash.isObject = isObject;
// ###noop
// Empty function
cash.noop = function() {},
// ###setCache
//
// `private`
cash._setCache_ = function(ref, el) {
  var cid = this._getCid_(el),
    obj = this.cache[ref];
  if(!cid) {
    cid = this.getUid();
    el.setAttribute('cid', cid);
  }
  obj[cid] || (obj[cid] = ref === 'events' ? {} : undefined);
  return obj;
};
