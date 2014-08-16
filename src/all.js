/*global cash isFunction slice*/

// ###\_all\_
// Abstracted logic for the call, assign, and collect methods
//
// `private`
cash._all = function(oArgs, assign, returns) {
  var meths = oArgs[0].split('.'),
  args = slice.call(oArgs, 1),
  meth = meths.pop(), r = [], f, v;

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
    if(returns) r.push(v);
  });
  return returns ? r : this;
};

// ###call
// Invokes the provided method or method chain with the provided arguments to all elements in q.
// Example usage:
// * $(nodeList).call('setAttribute', 'foo', 'bar');
// * $(nodeList).call('classList.add', 'active');
//
// `param` {string} `methodName`. Can be a string representing a method name, an attribute, or a property. Can be chained with periods.
//
// `returns` cash
//
cash.call = function() {
  return this._all(arguments, false, false);
};

// ###assign
// Sets the value on all elements in the q. Setters can be chained with periods.
// Example usage:
// * $(nodeList).assign('checked', true)
// * $(nodeList).assign('foo.bar', 'biz')
//
// `param` {string} `propertyName`. Can be a string representing an attribute or property. Can be chained with periods.
// `param` {any} `value`. The value to be assigned.
//
cash.assign = function() {
  return this._all(arguments, true, false);
};

// ###collect
// Similar to call(), collect() invokes the provided method or method chain but instead of returning cash, returns the return values from each function invocation.
// Example usage:
// * $(nodeList).collect('getAttribute', 'foo') #=> ['bar', 'biz', 'baz'];
// * $(nodeList).collect('classList.contains', 'active') #=> [true, false, true];
// * $(nodeList).collect('checked') #=> [true, false, false];
//
// `param` {string} `methodName`. Can be a string representing a method name, an attribute, or a property. Can be chained with periods.
//
// `returns` {array}
//
cash.collect = function() {
  return this._all(arguments, false, true);
};
