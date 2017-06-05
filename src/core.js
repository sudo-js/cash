import { slice, isWindow, isArray, isDocument } from './functions';

// ### get
// * Return the entire `q` or a particular element located at an index by
// passing nothing or a number respectively. Note that you can pass a
// negative number to fetch from the **end** of the `q` (-1 for the last for example).
//
// * `param` {number} `i`
//
// * `returns` {array|element}
export function get(i) {
  // intentional coercion
  return i == null ? this.q : (i > -1 ? this.q[i]: this.q[this.q.length + (i)]);
}
// fetch the unique identifier for this element
export function _getCid_(el) {
  return isWindow(el) ? 'window' : isDocument(el) ? 'document' : el.getAttribute('cid');
}
// ### getUid
// * Return a unique identifier via the _cid_ with an optional passed in prefix
//
// * `param` {string} `pre` Optional prefix for the identifier
//
// * `returns` {string}
export function getUid(pre) {
  let n = ++this._cid_;
  return pre ? pre + n : String(n);
}
// ### init
// * Breaking from the jQuery pattern, only a singile DOM node or NodeList is
// expected as arguments (though an array is acceptable). The passed in arg
// is normalized into an array and set as $.q. All chainable methods then
// operate on the q.
//
// * `param` {element|nodeList|array} `arg`
//
// * `returns` cash
export function init(arg=[]) {
  this.q = isArray(arg) ? arg : 
    (arg instanceof NodeList || arg instanceof HTMLCollection) ? slice.call(arg) : [arg];
  return this;
}
// sets our unique identifier for the element/event in question
export function _setCache_(ref, el) {
  let cid = this._getCid_(el),
    obj = this.cache[ref];
  if(!cid) {
    cid = this.getUid();
    el.setAttribute('cid', cid);
  }
  obj[cid] || (obj[cid] = ref === 'events' ? {} : undefined);
  return obj;
}
