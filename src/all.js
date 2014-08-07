/*global cash isFunction */


// ###\_all\_
// Abstracted logic for the call, assign, and collect methods
//
// `private`
cash._all = function(originalArgs, assign, returnValues) {
  var meths = originalArgs[0].split('.'),
  args = slice.call(originalArgs, 1),
  meth = meths[meths.length-1], r, f, i, v;

  if(returnValues) r = [];

  this.q.forEach(function(e){
    for(i=0;i < meths.length-1;i++) {
      f = e[meths[i]];
      if(isFunction(f)) e = f();
      else e = f;
    }
    if(assign) v = e[meth] = args[0];
    else {
      f = e[meth];
      if(isFunction(f)) v = f.apply(e, args);
      else v = f;
    }

    if(returnValues) r.push(v);
  });

  return returnValues ? r : this;
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
