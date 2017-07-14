import { slice, isWindow, isArray, isDocument } from './functions';

export default class {
  // ### get
  // * Return the entire `q` or a particular element located at an index by
  // passing nothing or a number respectively. Note that you can pass a
  // negative number to fetch from the **end** of the `q` (-1 for the last for example).
  //
  // * `param` {number} `i`
  //
  // * `returns` {array|element}
  get(i) {
    // intentional coercion
    return i == null ? this.q : (i > -1 ? this.q[i]: this.q[this.q.length + (i)]);
  }
  // fetch the unique identifier for this element
  _getCid_(el) {
    return isWindow(el) ? 'window' : isDocument(el) ? 'document' : el.getAttribute('cid');
  }
  // ### getUid
  // * Return a unique identifier via the _cid_ with an optional passed in prefix
  //
  // * `param` {string} `pre` Optional prefix for the identifier
  //
  // * `returns` {string}
  getUid(pre) {
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
  init(arg=[]) {
    this.q = isArray(arg) ? arg : 
      (arg instanceof NodeList || arg instanceof HTMLCollection) ? slice.call(arg) : [arg];
    return this;
  }
  // ### remove
  // * Used to not only remove the elements in the q from the DOM, but to 
  // remove any references they have in the $.cache as well.
  //
  // * `returns` cash
  remove() {
    const rem = el => { delete this.cache.events[el.getAttribute('cid')]; };
    this.q.forEach(function(el) {
      // unset any children
      slice.call(el.querySelectorAll('[cid]')).forEach(rem);
      // now the top-level parent
      rem(el);
      el.parentNode && el.parentNode.removeChild(el);
    });
    return this;
  }
  // sets our unique identifier for the element/event in question
  _setCache_(ref, el) {
    let cid = this._getCid_(el),
      obj = this.cache[ref];
    if(!cid) {
      cid = this.getUid();
      el.setAttribute('cid', cid);
    }
    obj[cid] || (obj[cid] = ref === 'events' ? {} : undefined);
    return obj;
  }  
}
