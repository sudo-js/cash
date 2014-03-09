(function(win) {
  var proto = Array.prototype, slice = proto.slice, keys = Object.keys,
    cssNum = {'column-count':1,'columns':1,'font-weight':1,'line-height':1,'opacity': 1,'z-index':1,'zoom':1};
    // value first as there may be no key
    function addPx(v, k) {return (typeof v === 'number' && (!k || !cssNum[k])) ? v + 'px' : v;}
    function cash(arg) {return cash.init(arg);}
    function isDocument(arg) {return arg && arg.nodeType === arg.DOCUMENT_NODE;}
    function isObject(arg) {return Object.prototype.toString.call(arg) === '[object Object]';}
    function isString(arg) {return typeof arg === 'string';}
    function isWindow(arg) {return arg === win;}
    // ###cache
    // Hash that holds the event and display data
    cash.cache = {events: {}, display: {}};
    // generate a unique id for elements
    cash.cid = 0;
    // ###closest
    // Given a string selector, return the first parent node that matches it
    // for each element in the q.
    // 
    // `param` {string} `sel`
    // `returns` cash
    cash.closest = function(sel) {
      var ary = [];
      this.q.forEach(function(el) {
        while(el && !$.matches(el, sel)) el = !isDocument(el) && el.parentNode;
        if(!(~ary.indexOf(el))) ary.push(el);
      });
      return $(ary);
    };
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
    // Given a key and a value, or a hash of key:value pairs, set each on the style property of
    // each element in the `q`.
    // This method does not function as a getter (use getComputedStyle for that).
    //
    // `param` {string | object} `k`
    // `param` {string} `v`
    // `returns` cash
    cash.css = function(k, v) {
      var ary = isString(k) ? undefined : keys(k),
      set = ary ? function(el) {ary.forEach(function(i) {el.style[i] = addPx(k[i], i);});} :
        function(el) {el.style[k] = addPx(v, k);};
      this.q.forEach(set);
      return this;
    };
    // ###deserialize
    // Given a 'paramaterized' string, convert it to a hash and return it
    //
    // `param` {string} `str`
    // `returns` {object}
    cash.deserialize = function(str) {
      var obj = {}, ary;
      str.split('&').forEach(function(spl) {
        if(spl) {
          ary = spl.split('=');
          obj[ary[0]] = ary[1];
        }
      });
      return obj;
    };
    // ###extend
    // Copy the (non-inherited) key:value pairs from <n> source objects to a single target object.
    //
    // `params` {objects} A target object followed by <n> source objects
    // `returns` {object} A single object
    cash.extend = function() {
      var args = slice.call(arguments), targ = args.shift(), obj;
      function fn(k) {targ[k] = obj[k];}
      // iterate over each passed in obj remaining
      for(; args.length && (obj = args.shift());) {keys(obj).forEach(fn);}
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
      function fn(n) {ary.push(n);}
      this.q.forEach(function(el) {
        if(el.querySelectorAll) proto.forEach.call(el.querySelectorAll(sel),fn);
      });
      return $(ary);
    };
    // ###getXhr
    // While getting a new XMLHttpRequest is standardized now, we are still going 
    // to provide this syntactic sugar to allow the setting of global headers (will
    // be set on each request) as well as the onload, onerrer, onloadend, timeout and
    // ontimeout properties and methods to be set with one call.
    // Does not have a default for obj.url all others are:
    //   {
    //     verb: 'GET',
    //     responseType: 'text',
    //     url: mandatory,
    //     params: optional,
    //     onload: _.noop,
    //     onerror: optional,
    //     onloadend: optional,
    //     timeout: optional,
    //     ontimeout: optional,
    //     user: optional,
    //     password: optional
    //   }
    // If the verb is 'GET' and params is truthy it will be appended to the url as a 
    // queryString (after being serialized if a hash -- assumed to be a string if not).
    // This method does not call send() so do that once you have the xhr back, remember
    // to set any pertinant MIME types if sending data via setRequestHeader (unless its 
    // already in the $.xhrHeaders).
    //
    // `param` {object} `obj`. attributes for the XHR
    // `returns` {object} the xhr object
    cash.getXhr = function(obj) {
      var xhr =  new XMLHttpRequest();
      obj.verb || (obj.verb = 'GET');
      // check if we need a QS
      if(obj.verb === 'GET' && obj.params) {
        // assumed to be an object literal if not a string
        if(typeof obj.params !== 'string') obj.params = this.serialize(obj.params);
        obj.url += ('?' + obj.params);
      }
      xhr.open(obj.verb, obj.url, true, obj.user, obj.password);
      xhr.responseType = obj.responseType || 'text';
      // so that some common use-case request headers can be set automagically, for blob, 
      // document, buffer and others handle manually after getting the xhr back.
      if(xhr.responseType === 'text') {
        // could be json or plain string TODO expand this to a hash lookup for other types later
        if(obj.contentType && obj.contentType === 'json') {
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.setRequestHeader('Content-Type', 'application/json');
        } else {
          xhr.setRequestHeader('Accept', 'text/plain');
          xhr.setRequestHeader('Content-Type', 'text/plain');
        }
      }
      // set any custom headers
      keys(this.xhrHeaders).forEach(function(h) {xhr.setRequestHeader(h, $.xhrHeaders[h]);});
      // The native xhr considers many status codes a success that we do not, wrap the onload
      // so that we can call success or error based on code
      xhr.onload = function(e) {
        if(this.status >= 200 && this.status < 300 || this.status === 304) this._onload_(e);
        else this.onerror(e);
      };
      xhr._onload_ = obj.onload || this.noop;
      xhr.onerror = obj.onerror || this.noop;
      if(obj.onloadend) xhr.onloadend = obj.onloadend;
      if(obj.timeout) xhr.timeout = obj.timeout;
      if(obj.ontimeout) xhr.ontimeout = obj.ontimeout;
      return xhr;
    };
    // ###height
    // Given a value this method is a setter for each element in the q.
    // If the arg is truthy and a number it is converted to a string with 'px'
    // added, if it is a string nothing is added.
    // Minus that, it returns the height of the 0th item in the q;
    //
    // `param` {number|string} `val`. Optional value to be set
    // `returns` {number|object} The height if a getter, cash if a setter
    cash.height = function(val) {return this._hw_('height', val);};
    // ###hide
    // Makes elements in the q invisible in the DOM by modifying
    // the `display` attribute, if necessary.
    //
    // `returns` cash
    cash.hide = function() {return this._sh_('hide');};
    // ###_hw_
    // Abstracted logic for the height and width operations
    // `private`
    cash._hw_ = function(key, val) {
      var obj = {
        height: {w:'innerHeight',d:'scrollHeight',e:'offsetHeight'},
        width: {w:'innerWidth',d:'scrollWidth',e:'offsetWidth'}
      }, node = this.q[0], type = obj[key];
      function what(el) {return isWindow(el) ? type.w : isDocument(el) ? type.d : type.e;}
      if(!val) return node.style[what(node)];
      this.q.forEach(function(el) {
        el.style[what(el)] = addPx(val);
      });
      return this;
    };
    // init
    // Breaking from the jQuery pattern, only a singile DOM node or NodeList is
    // expected as arguments (though an array is acceptable). The passed in arg 
    // is normalized into an array and set as $.q. All chainable methods then 
    // operate on the q.
    //
    // `param` {element|nodeList|array} `arg`
    // `returns` cash
    cash.init = function(arg) {
      // guard against falsey arg
      this.q = arg && arg.length ? (Array.isArray(arg) ? arg : 
        slice.call(arg)) : (arg ? [arg] : []);
      return this;
    };
    // ###isObject
    // Ye olde toString fallback to see if a passed in argument is an object.
    // Really you should test the other cases (Array.isArray for example) but this
    // does 'even' the API a little
    //
    // `param` {*}
    // `returns` {bool}
    cash.isObject = isObject;
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
    // ###noop
    // Empty function
    cash.noop = function() {},
    // ###off
    cash.off = function(type, fn) {
      var sp = type.split('.'), ev = sp[0], ns = sp.splice(1).join('.'),
        events, cid; 
      this.q.forEach(function(el) {
        cid = isWindow(el) ? 'window' : el.cid, events = $.cache.events[cid];
        if(events && events[ev]) {
          events[ev].forEach(function(obj, i, ary) {
            // namespace or passed fn or both?
            if((!ns || ns === obj.ns) && (!fn || fn === obj.fn)) {
              el.removeEventListener(ev, obj.cb);
              delete ary[i];
            }
          });
          // remove the falsey indices that were deleted
          events[ev] = events[ev].filter(function(i) {return i !== undefined;}); 
        }
      });
      return this;
    };
    // ###on
    // Given an event type, a callback, an optional selector for delegation, and
    // an optional hash of data to be appended to the event, bind them to each
    // element in the q.
    //
    // `param` {string} `type`. Can be "namespaced" i.e click.foo
    // `param` {function} `fn`
    // `param` {string} `sel` optional CSS selector for delegation
    // `param` {object} `data` optional hash to be appended to the event object
    // `returns` cash
    cash.on = function(type, fn, sel, data) {
      var sp = type.split('.'), ev = sp[0], ns = sp.splice(1).join('.'), 
        cb, events, targ;
      this.q.forEach(function(el) {
        events = $._setCache_('events', el)[el.cid || 'window'];
        events[ev] || (events[ev] = []);
        cb = function(e) {
          // pass the namespace along to the listener
          if(ns) e.namespace = ns;
          // pass any custom data along to the listener
          if(data) e.data = data;
          // base case is that this is not 'delegated'
          if(!sel) fn.call(el, e);
          // there is a sel, check for matches and call if so.
          else if(~$(el).find(sel).q.indexOf(e.target) || (targ = $(el).find(sel).contains(e.target).q[0])) {
            targ || (targ = e.target);
            e.currentTarget = targ;
            fn.call(targ, e);
          }
        };
        // cb === ours, fn === theirs.
        events[ev].push({ns: ns, cb: cb, fn: fn});
        el.addEventListener && el.addEventListener(ev, cb);
      });
      return this;
    };
    // ###serialize
    // Given a hash of data, convert it to a 'paramaterized' string and return it.
    //
    // `param` {object} `obj`
    // `returns` {string}
    cash.serialize = function(obj) {
      var ary = [];
      keys(obj).forEach(function(key) {
        ary.push(escape(key) +'='+ escape(obj[key]));
      });
      return ary.join('&').replace(/%20/g, '+');
    };
    // ###setCache
    // private. 
    cash._setCache_ = function(ref, el) {
      var cid = isWindow(el) ? 'window' : el.cid,
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
    cash.show = function() {return this._sh_('show');};
    // ###_sh_
    // Abstracted logic for the show and hide methods
    // `private`
    cash._sh_ = function(key) {
      var isShow = key === 'show';
      function state(el) {return isShow ? getComputedStyle(el).display !== 'none' : getComputedStyle(el).display === 'none';}
      function none(arg) {return isShow ? arg !== 'none': arg === 'none';}
      function notNone(arg) {return isShow ? arg === 'none': arg !== 'none';}
      
      this.q.forEach(function(el) {
        var display = $._setCache_('display', el),
          old = display[el.cid];
        if(state(el)) {
          if(none(old)) delete display[el.cid];
        // does an old display value exist?
        } else if (old && none(old)) {
          el.style.display = old;
          delete display[el.cid];
        // the element is not visible and does not have an old display value
        } else {
          // is the element hidden with inline styling?
          if(el.style.display && notNone(el.style.display)) {
            display[el.cid] = el.style.display;
            el.style.display = isShow ? '' : 'none';
          // the element is hidden through css
          } else el.style.display = isShow ? 'block': 'none';
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
      var ary = slice.call(this.q);
      ary.forEach(function(el) {
        getComputedStyle(el).display === 'none' ?
          $(el).show() : $(el).hide();
      });
      return $(ary);
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
    // ###width
    // Given a value this method is a setter for each element in the q.
    // If the arg is truthy and a number it is converted to a string with 'px'
    // added, if it is a string nothing is added.
    // Minus that, it returns the width of the 0th item in the q;
    //
    // `param` {number|string} `val`. Optional value to be set
    // `returns` {number|object} The height if a getter, cash if a setter
    cash.width = function(val) {return this._hw_('width', val);};
    // ###xhrHeaders
    // Any 'global' headers that should go out with every XHR request 
    cash.xhrHeaders = {};

    // Not checking for window ATM, or trying to play nice
    win.$ = cash;
}(window));