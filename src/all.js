import { slice, isFunction } from './functions';

// Abstracted logic for the call, assign, and collect methods
export function _all_(oArgs, assign, returns) {
  let meths = oArgs[0].split('.'), args = slice.call(oArgs, 1),
    meth = meths.pop(), r = returns ? [] : undefined, f, v;

  this.q.forEach(function(el) {
    meths.forEach(function(prop) {
      f = el[prop];
      // TODO are we sure of a return here?
      el = isFunction(f) ? f() : f;
    });
    
    if(assign) v = el[meth] = args[0];
    else {
      f = el[meth];
      v = isFunction(f) ? f.apply(el, args) : f;
    }
    
    returns && r.push(v);
  });
  
  return returns ? r : this;
}

// ### assign
// * Sets the value on all elements in the q. Setters can be chained with periods.
// * Example usage:
// * $(nodeList).assign('checked', true)
// * $(nodeList).assign('foo.bar', 'biz')
//
// * `param` {string} `propertyName`. Can be a string representing an attribute or property. Can be chained with periods.
// * `param` {any} `value`. The value to be assigned.
export function assign() {
  return this._all_(arguments, true, false);
}

// ### call
// * Invokes the provided method or method chain with the provided arguments to all elements in q.
// * Example usage:
// * $(nodeList).call('setAttribute', 'foo', 'bar');
// * $(nodeList).call('classList.add', 'active');
//
// * `param` {string} `methodName`. Can be a string representing a method name, an attribute, or a property. Can be chained with periods.
//
// * `returns` cash
export function call() {
  return this._all_(arguments, false, false);
}

// ### collect
// * Similar to call(), collect() invokes the provided method or method chain but instead of returning cash, returns the return values from each function invocation.
// * Example usage:
// * $(nodeList).collect('getAttribute', 'foo') #=> ['bar', 'biz', 'baz'];
// * $(nodeList).collect('classList.contains', 'active') #=> [true, false, true];
// * $(nodeList).collect('checked') #=> [true, false, false];
//
// `param` {string} `methodName`. Can be a string representing a method name, an attribute, or a property. Can be chained with periods.
//
// `returns` {array}
//
export function collect() {
  return this._all_(arguments, false, true);
}
