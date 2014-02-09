(function(win) {
  var undefined, ary = [], slice = ary.slice, filter = ary.filter,
    doc = win.document, keys = Object.keys,
    // not using __proto__ as it is deprecated  
    cash = function(arg) {return new cash.fn.init(arg);};
    
    cash._cache_ = {display: {}, events: {}, id: 0},
    
    // ###extend
    // Copy the (non-inherited) key:value pairs from <n> source objects to a single target object.
    //
    // `params` {objects} A target object followed by <n> source objects
    // `returns` {object} A single object
    cash.extend = function() {
      var args = slice.call(arguments),
          targ = args.shift(), i, obj, keys;
        // iterate over each passed in obj remaining
        for(obj; args.length && (obj = args.shift());) {
          keys = Object.keys(obj);
          for(i = 0; i < keys.length; i++) {
            targ[keys[i]] = obj[keys[i]];
          }
        }
        return targ;
    };
    // ###forEach
    // This method will simply construct a `for` loop around the passed in list and call the
    // provided function with item, index and list. Returns the list.
    //
    // `param` {NodeList | Array} `list`
    // `param` {function} `fn`
    // `returns` {nodeList} `list`
    cash.forEach = function(list, fn) {
      var len = list.length, i;
      for (i = 0; i < len; i++) {
        // use the same argument signature as the native array.forEach
        fn(list[i], i, list);
      }
      return list;
    };
    // ###merge
    //
    // `param` {object} `_this`
    // `param` {node | nodeList} arg
    // `returns` {object} `_this`
    cash.merge = function(_this, arg) {
      var len = arg.length, _t = _this.length, i = 0;
      // as the arg could be a nodeList, we must iterate
      while (i < len) _this[_t++] = arg[i++];
      _this.length = _t;
      return _this;
    };
    
    cash.fn = cash.prototype = {
      pop: ary.pop,
      push: ary.push,
      reverse: ary.reverse,
      shift: ary.shift,
      sort: ary.sort,
      splice: ary.splice,
      slice: slice,
      indexOf: ary.indexOf,
      forEach: ary.forEach,
      unshift: ary.unshift,
      concat: ary.concat,
      join: ary.join,
      every: ary.every,
      some: ary.some,
      filter: ary.filter,
      map: ary.map,
      reduce: ary.reduce,
      reduceRight: ary.reduceRight,
      length: 0,
      
      init: function(arg) {return cash.merge(this, Array.isArray(arg) ? arg : [arg]);}
    };
    
    cash.fn.constructor = cash;
    cash.fn.init.prototype = cash.fn;
    
    // Not checking for window ATM, or trying to play nice
    win.$ = cash;

}(window));