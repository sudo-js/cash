/*global cash isFunction */


// ###\_all\_
// Abstracted logic for the all and getAll methods
//
// `private`
cash._all = function(originalArgs, returnValues) {
  var meths = originalArgs[0].split('.'),
  args = slice.call(originalArgs, 1),
  meth = meths[meths.length-1],
      assign = /=$/.test(meth), r, f, i, v;
  if(assign) meth = meth.substr(0,meth.length-1);
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

// ###all
// Invokes the provided method or method chain with the provided arguments to all elements in q.
// Example usage:
// * $(nodeList).all('setAttribute', 'foo', 'bar');
// * $(nodeList).all('classList.add', 'active');
// * $(nodeList).all('selected=', true);
//
// `param` {string} `methodName`. Can be a string representing a method name, an attribute, or a property. Can be chained with periods. Can end in a `=` to invoke an assignment.
//
// `returns` cash
//
//
cash.all = function() {
  return this._all(arguments, false);
};

// ###getAll
// Similar to all(), getAll invokes the provided method or method chain but instead of returning cash, returns the return values from each function invocation.
// Example usage:
// * $(nodeList).all('getAttribute', 'foo') #=> ['bar', 'biz', 'baz'];
// * $(nodeList).all('classList.contains', 'active') #=> [true, false, true];
// * $(nodeList).all('selected') #=> [true, false, false];
//
// `param` {string} `methodName`. Can be a string representing a method name, an attribute, or a property. Can be chained with periods. Can end in a `=` to invoke an assignment.
//
// `returns` {array}
//
//
cash.getAll = function() {
  return this._all(arguments, true);
};
