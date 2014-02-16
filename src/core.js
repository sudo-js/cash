(function(win) {
  var proto = Array.prototype, slice = proto.slice, keys = Object.keys,
    cash = function(arg) {return cash.init(arg);},
    isString = function(arg) {return typeof arg === "string";},
    isObject = function(arg) {return Object.prototype.toString.call(arg) === '[object Object]';},
    isFunction = function(arg) {return typeof arg === "function";};
    
    cash.cache = {events: {}, display: {}};
    
    cash.cid = 0;
    // ###css
    //
    // NOTE: the getter case is not supported, just use getComputedStyle
    //
    cash.css = function(key, value) {
      var setter;
      // Setter
      if (value) setter = function(el) {el.style[key] = value;};
      else if (isObject(key)) {
        setter = function(el) {
          keys(key).forEach(function(name) {
            el.style[name] = key[name];
          });
        };
      }
      this.q.forEach(setter);
      return this;
    };
    // ###extend
    // Copy the (non-inherited) key:value pairs from <n> source objects to a single target object.
    //
    // `params` {objects} A target object followed by <n> source objects
    // `returns` {object} A single object
    cash.extend = function() {
      var args = slice.call(arguments),
          targ = args.shift(), i, len, obj, _keys;
        // iterate over each passed in obj remaining
        for(obj; args.length && (obj = args.shift());) {
          _keys = keys(obj);
          for(i = 0, len = _keys.length; i < len; i++) {
            targ[_keys[i]] = obj[_keys[i]];
          }
        }
        return targ;
    };
    // ###hide
    // Makes an element(s) invisible in the DOM by modifying
    // the `display` attribute, if necessary.
    //
    // `param` {node} `node`
    // `returns` {node}
    cash.hide = function() {
      this.q.forEach(function(el) {
        // setCache sets an entry in the cache if needed and returns it
        var display = $.setCache('display', el),
          old = display[el.cid];
        // is the element already hidden?
        if(getComputedStyle(el).display === 'none') {
          if(old === 'none') delete display[el.cid];
        // does an old display value exist?
        } else if (old === 'none') {
          el.style.display = old;
          delete display[el.cid];
        // the element is visible and does not have an old display value
        } else {
          // is the element visible with inline styling?
          if(el.style.display && el.style.display !== 'none') {
            display[el.cid] = el.style.display;
            el.style.display = 'none';
          // the element is visible through css
          } else el.style.display = 'none';
        }  
      });
      return this;
    };
    
    cash.init = function(arg) {
      this.q = arg.length ? slice.call(arg) : [arg];
      return this;
    };
    
    cash.isObject = isObject;
    
    cash.setCache = function(ref, el) {
      var cid = el === win ? 'window' : el.cid,
        obj = this.cache[ref];
      if(!cid) el.cid = cid = String(++this.cid);
      obj[cid] || (obj[cid] = ref === 'events' ? {} : undefined);
      return obj;
    };
      
    // ###show
    // Makes an element(s) visible in the DOM by modifying
    // the `display` attribute, if necessary.
    //
    // `param` {node} `node`
    // `returns` {node}
    cash.show = function() {
      this.q.forEach(function(el) {
        var display = $.setCache('display', el),
          old = display[el.cid];
        // is the element already visible?
        if(getComputedStyle(el).display !== 'none') {
          // remove display value
          if(old !== 'none') delete display[el.cid];
        // does an old display value exist?
        } else if (old && old !== 'none') {
          el.style.display = old;
          delete display[el.cid];
        // the element is not visible and does not have an old display value
        } else {
          // is the element hidden with inline styling?
          if(el.style.display === 'none') {
            display[el.cid] = el.style.display;
            el.style.display = '';
          // the element is hidden through css
          } else el.style.display = 'block';
        }
      });
      return this;
    };
    
    // Not checking for window ATM, or trying to play nice
    win.$ = cash;
}(window));