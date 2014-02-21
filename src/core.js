(function(win) {
  var proto = Array.prototype, slice = proto.slice, keys = Object.keys,
    cash = function(arg) {return cash.init(arg);};
    cash.cache = {events: {}, display: {}};
    cash.cid = 0;
    // ###contains
    // See if any element in the current q contains the passed in element,
    // setting the q as the container if found.
    //
    // `param` {element} `el`
    // `returns` cash
    cash.contains = function(el) {
      var res;
      this.q.reverse().some(function(node) {
        if(node.contains(el)) return res = node;
      });
      return $(res);
    };
    // ###create
    // Given a string, create a DOM element and store place in at the q. Notice 
    // that the input must be a single 'top-level' Element, but it may contain 
    // any number of children.
    //
    // `param` {string} `str`. An innerHTML compatible string
    // `returns` cash
    cash.create = function(str) {
      var wrap = document.createElement('div');
      wrap.innerHTML = str;
      return $(wrap.firstElementChild);
    };
    // ###css
    // Given a key and a value, set them on the 
    // element.style for each element in the current q. Notice that the 
    // 'getter' case in not supported as you should just use 
    // getComputedStyce(el)[key] in that scenario. Also notice that the
    // object argument case is not supported.
    //
    // `param` {string} `key`
    // `param` {string} `value`.
    // `returns` cash
    cash.css = function(key, value) {
      this.q.forEach(function(el) {el.style[key] = value;});
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
    // ###find
    // From the existing q, rebuild it by performing a querySelectorAll
    // with the given selector on each element in the q, pushing those elements 
    // found into the new q.
    //
    // `param` {string} `sel`
    // `returns` cash
    cash.find = function(sel) {
      var ary = [];
      this.q.forEach(function(el) {
        if(el.querySelectorAll) {
          proto.forEach.call(el.querySelectorAll(sel), function(node) {
            ary.push(node);
          });
        }
      });
      this.q = ary;
      return this;
    };
    // ###hide
    // Makes elements in the q invisible in the DOM by modifying
    // the `display` attribute, if necessary.
    //
    // `returns` cash
    cash.hide = function() {
      this.q.forEach(function(el) {
        // setCache sets an entry in the cache if needed and returns it
        var display = $._setCache_('display', el),
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
    // init
    // Breaking from the jQuery pattern, only a singile DOM node or NodeList is
    // expected as arguments. The passed in arg is normalized into an array and 
    // set as $.q. All chainable methods then operate on the q.
    //
    // `param` {element|nodeList|array} `arg`
    // `returns` cash
    cash.init = function(arg) {
      // guard against falsey arg
      this.q = arg && arg.length ? slice.call(arg) : (arg ? [arg] : []);
      return this;
    };
    // ###matches
    // Unfortunately the matchesSelector methods are all hidden behind prefixes ATM.
    // set the useable one, if not, then return the bool.
    //
    // `param` {element} `el`. A DOM 1 nodetype
    // `param` {string}  `sel`. A CSS selector
    // `returns` {bool}
    cash.matches = function(el, sel) {
      if (el.nodeType !== 1) return false;
      // normalize the native selector match fn until all the prefixes are dropped
      if(!this._matchesSelector_) {
        this._matchesSelector_ = el.webkitMatchesSelector || el.mozMatchesSelector ||
        el.msMatchesSelector || el.oMatchesSelector || el.matchesSelector;
      }
      return this._matchesSelector_.call(el, sel);
    };
    // ###off
    cash.off = function(type, fn) {
      this.q.forEach(function(el) {
        var cid = el === window ? 'window' : el.cid, 
          events = $.cache.events[cid], cb;
        if(!events) return;
        if(events[type]) {
          events[type].forEach(function(obj, i) {
            if(fn && fn === obj.fn || !fn) cb = obj.cb;
            // TODO would these ever not match?
            if(events[type][i].cb === cb) {
                el.removeEventListener(type, cb);
                delete $.cache.events[cid][type][i];
            }
          });
        }
      });
      return this;
    };
    // ###on
    // Given an event type, a callback, an optional selector for delegation, and
    // an optional hash of data to be appended to the event, bind them to each
    // element in the q.
    //
    // `param` {string} `type`
    // `param` {function} `fn`
    // `param` {string} `sel` optional CSS selector for delegation
    // `param` {object} `data` optional hash to be appended to the event object
    // `returns` cash
    cash.on = function(type, fn, sel, data) {
      var cb, events, targ;
      this.q.forEach(function(el) {
        events = $._setCache_('events', el)[el.cid];
        events[type] || (events[type] = []);
        cb = function(e) {
          // pass any custom data along to the listener
          if(data) e.data = data;
          // base case is that this is not 'delegated'
          if(!sel) fn.call(el, e);
          // there is a sel, check for matches and call if so.
          else if(~$(el).find(sel).q.indexOf(e.target) || (targ = $.contains(e.target).q[0])) {
            targ || (targ = e.target);
            e.currentTarget = targ;
            fn.call(targ, e);
          }
        };
        // cb === ours, fn === theirs.
        events[type].push({cb:cb,fn:fn});
        el.addEventListener && el.addEventListener(type, cb);
      });
      return this;
    };
    // ###setCache
    // private. 
    cash._setCache_ = function(ref, el) {
      var cid = el === win ? 'window' : el.cid,
        obj = this.cache[ref];
      if(!cid) el.cid = cid = String(++this.cid);
      obj[cid] || (obj[cid] = ref === 'events' ? {} : undefined);
      return obj;
    };
    // ###show
    // Makes elements in the q visible in the DOM by modifying
    // the `display` attribute, if necessary.
    //
    // `returns` cash
    cash.show = function() {
      this.q.forEach(function(el) {
        var display = $._setCache_('display', el),
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
    // ###toggle
    // Toggles the visibility of elements in the DOM by modifying
    // the `display` attribute, if necessary.
    //
    // `returns` cash
    cash.toggle = function() {
      var _q = slice.call(this.q);
      _q.forEach(function(el) {
        getComputedStyle(el).display === 'none' ?
          $(el).show() : $(el).hide();
      });
      $.q = _q;
      return this;
    };
    // ###trigger
    // Given an event type, init a DOM event and dispatch it to each element in the q.
    //
    // `param` {string} `e`
    // `returns` cash
    cash.trigger = function(e) {
      var evt = document.createEvent('Event');
      evt.initEvent(e, true, true);
      this.q.forEach(function(el) {
        el.dispatchEvent && el.dispatchEvent(evt);
      });
      return this;
    };

    // Not checking for window ATM, or trying to play nice
    win.$ = cash;
}(window));