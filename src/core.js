(function(win) {
  var ary = [], slice = ary.slice, keys = Object.keys,
    // not creating a new instance, just setting the current query and returning
    cash = function(arg) {return cash.init(arg);},
    
    isString = function(arg) {return typeof arg === "string";},
    isObject = function(arg) {return Object.prototype.toString.call(arg) === '[object Object]';},
    isArray = ary.isArray,
    isFunction = function(arg) {return typeof arg === "function";};
    
    cash._cache_ = {events: {}, id: 0},
    
    cash.each = function(fn) {
      // this.query may be a single element
      if(this.length < 2) fn(this.query);
      // or a NodeList
      else {
        for(var i = 0, len = this.length; i < len; i++) {
          fn(this.query[i], i, this.query);
        } 
      }
      return this;
    };
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
      
    cash.init = function(arg) {
      this.query = arg;
      this.length = arg.length || 1;
      return this;
    },
      
    cash.css = function(key, value) {
      var setter;
      // Getter for a single el
      if (isString(key) && !value) return win.getComputedStyle(this.query)[key];
      // Setter
      if (value) setter = function(el) {el.style[key] = value;};
      else if (isObject(key)) {
        setter = function(el) {
          keys(key).forEach(function(name) {
            el.style[name] = key[name];
          });
        };
      }
      this.each(setter);
      return this;
    },
    // ###show
    // Makes an element visible in the DOM by modifying
    // the `display` attribute, if necessary.
    //
    // `param` {node} `node`
    // `returns` {node}
    cash.show = function() {
      this.each(function(el) {
        var old = el.getAttribute('data-old-display');
        // is the element already visible?
        if(getComputedStyle(el).display !== 'none') {
          // remove display value
          if(old !== 'none') el.removeAttribute('data-old-display');
        // does an old display value exist?
        } else if (old && old !== 'none') {
          el.style.display = old;
          el.removeAttribute('data-old-display');
        // the element is not visible and does not have an old display value
        } else {
          // is the element hidden with inline styling?
          if(el.style.display === 'none') {
            el.setAttribute('data-old-display', el.style.display);
            el.style.display = '';
          // the element is hidden through css
          } else el.style.display = 'block';
        }
      });
      return this;
    };
    // ###hide
    // Makes an element invisible in the DOM by modifying
    // the `display` attribute, if necessary.
    //
    // `param` {node} `node`
    // `returns` {node}
    cash.hide = function() {
      this.each(function(el) {
        var old = el.getAttribute('data-old-display');
        // is the element already hidden?
        if(getComputedStyle(el).display === 'none') {
          if(old === 'none') el.removeAttribute('data-old-display');
        // does an old display value exist?
        } else if (old === 'none') {
          el.style.display = old;
          el.removeAttribute('data-old-display');
        // the element is visible and does not have an old display value
        } else {
          // is the element visible with inline styling?
          if(el.style.display && el.style.display !== 'none') {
            el.setAttribute('data-old-display', el.style.display);
            el.style.display = 'none';
          // the element is visible through css
          } else el.style.display = 'none';
        }  
      });
      return this;
    };
    
    cash.isObject = isObject;
    
    // Not checking for window ATM, or trying to play nice
    win.$ = cash;

}(window));