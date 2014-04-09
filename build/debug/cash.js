(function(window) {
var proto = Array.prototype, slice = proto.slice, keys = Object.keys,
cssNum = {'column-count':1,'columns':1,'font-weight':1,'line-height':1,'opacity': 1,'z-index':1,'zoom':1};
// value first as there may be no key
function addPx(v, k) {return (typeof v === 'number' && (!k || !cssNum[k])) ? v + 'px' : v;}
function cash(arg) {return cash.init(arg);}
function isDocument(arg) {return arg && arg.nodeType === arg.DOCUMENT_NODE;}
function isObject(arg) {return Object.prototype.toString.call(arg) === '[object Object]';}
function isString(arg) {return typeof arg === 'string';}
function isWindow(arg) {return arg === window;}

// ###cache
// Hash that holds the event and display data
cash.cache = {events: {}, display: {}};
// generate a unique id for elements
cash.cid = 0;
// ###get
// Return the entire `q` or a particular element located at an index by 
// passing nothing or a number respectively. Note that you can pass a 
// negative number to fetch from the **end** of the `q` (-1 for the last for example).
//
// `param` {number} `i`
// `returns` {array|element}
cash.get = function(i) {
  // intentional coercion 
  return i == null ? this.q : (i > -1 ? this.q[i]: this.q[this.q.length + (i)]);
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
  // base case is already an array, then handle node(List) and falsey
  this.q = Array.isArray(arg) ? arg : (arg ? ((arg instanceof NodeList || arg instanceof HTMLCollection) ? 
    slice.call(arg) : [arg]) : []);
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
// ###noop
// Empty function
cash.noop = function() {},
// ###setCache
// private.
cash._setCache_ = function(ref, el) {
  var cid = isWindow(el) ? 'window' : el.cid,
    obj = this.cache[ref];
  if(!cid) el.cid = cid = String(++this.cid);
  obj[cid] || (obj[cid] = ref === 'events' ? {} : undefined);
  return obj;
};

// ###attr
// Given a single attribute and value or a hash of them set it/them on each
// element in the `q`. This method does not function as a getter.
//
// `param` {string|object} `key`
// `param` {string} `val`. Used if the `key` is not an object
// `returns` cash
cash.attr = function(key, val) {
  var ary = isString(key) ? undefined : keys(key),
  set = ary ? function(el) {ary.forEach(function(i) {el.setAttribute(i, key[i]);});} :
    function(el) {el.setAttribute(key, val);};
  this.q.forEach(set);
  return this;
};
// ###removeAttr
// Given a single attribute name or an array of them, remove it/them from each
// element in the `q`.
//
// `param` {string|array} `key`
// `returns` cash
cash.removeAttr = function(key) {
  var rem = Array.isArray(key) ? function(el) {key.forEach(function(a) {el.removeAttribute(a);});} :
    function(el) {el.removeAttribute(key);};
  this.q.forEach(rem);
  return this;
};

// ###addClass
// Add a class, or muliple classes, to each element in the `q`
//
// `param` {string} `cls`. Single or multiple class names (space delimited).
// `returns` cash
cash.addClass = function(cls) {
  var ary = cls.split(' ');
  this.q.forEach(function(el) {
    if(el.classList) ary.forEach(function(n) {el.classList.add(n);});
  });
  return this;
};
// ###removeClass
// Remove a class, or muliple classes, from each element in the `q`
//
// `param` {string} `cls`. Single or multiple class names (space delimited).
// `returns` cash
cash.removeClass = function(cls) {
  var ary = cls.split(' ');
  this.q.forEach(function(el) {
    if(el.classList) ary.forEach(function(n) {el.classList.remove(n);});
  });
  return this;
};
// ###toggleClass
// Given a class name (or multiple class names), add them if not already present. Remove if so.
//
// `param` {string} `cls`
// returns cash
cash.toggleClass = function(cls) {
  var ary = cls.split(' ');
  this.q.forEach(function(el) {
    if(el.classList) {
      ary.forEach(function(n) {
        el.classList.contains(n) ? el.classList.remove(n) : el.classList.add(n);
      });
    }
  });
  return this;
};

// ###css
// Given a key and a value, or a hash of key:value pairs, set each on the style property of
// each element in the `q`.
// This method does not function as a getter (use getComputedStyle for that).
//
// `param` {string|object} `key`
// `param` {string} `val`. Used if `key` is not an object
// `returns` cash
cash.css = function(key, val) {
  var ary = isString(key) ? undefined : keys(key),
  set = ary ? function(el) {ary.forEach(function(i) {el.style[i] = addPx(key[i], i);});} :
    function(el) {el.style[key] = addPx(val, key);};
  this.q.forEach(set);
  return this;
};
// ###offset
// Get a hash of key:value pairs: `top`, `left`, `width` and `height` - representing
// the position in the document of the 0th element in the q. This method is a getter only
// (use `css()` as a setter). Takes into consideration the page[X|Y]Offsets for
// `left` and `top` as well as rounds the width and height
//
// `returns` {object}
cash.offset = function() {
  if(!this.q.length) return null;
  var obj = this.q[0].getBoundingClientRect();
  return {
    left: obj.left + window.pageXOffset,
    top: obj.top + window.pageYOffset,
    width: Math.round(obj.width),
    height: Math.round(obj.height)
  };
};

// ###off
// Remove event bindings from the q which match the given type and/or function.
// By supplying "*.yourNamespace" as the event type, you can remove all events
// in a namespace, or simply '*' to remove all events.
// The optional third argument, 'cap', is a boolean than will need to be
// `true` if you bound the event originally with `cap = true`. 
// NOTE: You do not need to pass the 'cap' bool in the 'forced capture phase'
// case, that is the event is 'focus' or 'blur' and is delegated. Cash will 
// handle the capture phase bool for you in that case. 
//
// `param` {string} `type`. An event trigger, can be namespaced
// `param` {function}  `fn`. The function which should be removed, optional.
// `returns` cash
cash.off = function(type, fn, cap) {
  var sp = type.split('.'), ev = sp[0], ns = sp.splice(1).join('.'),
    all = ev === '*', events, cid;
  this.q.forEach(function(el) {
    cid = isWindow(el) ? 'window' : el.cid, events = $.cache.events[cid];
    if(events) {
      (all ? Object.keys(events) : [ev]).forEach(function(k) {
        events[k] && events[k].forEach(function(obj, i, ary) {
          // we may have forced the cap
          if(!cap && (k === 'focus' || k === 'blur') && obj.sel) cap = true;
          if((!ns || ns === obj.ns) && (!fn || fn === obj.fn) && (cap === obj.cap)) {
            el.removeEventListener(k, obj.cb, obj.cap);
            delete ary[i];
          }
        });
        // remove the falsey indices that were deleted
        if(events[k]) events[k] = events[k].filter(function(i) {return i !== undefined;});
      });
    }
  });
  return this;
};

// ###on
// Given an event type, a callback, an optional selector for delegation, and
// an optional hash of data to be appended to the event, bind them to each
// element in the q. Capture phase is supported by passing true as the 
// optional 5th argument. NOTE: if the event being bound is 'focus' or 'blur'
// and a selector is present capture phase is forced as delegation will not work otherwise.
//
// `param` {string} `type`. Can be "namespaced" i.e click.foo
// `param` {function} `fn`
// `param` {string} `sel` optional CSS selector for delegation
// `param` {object} `data` optional hash to be appended to the event object
// `param` {bool} `cap` optional bool to force capture phase
// `returns` cash
cash.on = function(type, fn, sel, data, cap) {
  var sp = type.split('.'), ev = sp[0], ns = sp.splice(1).join('.'),
    cb, events;
  // we force capture phase here so that delegation works
  if(!cap && (ev === 'focus' || ev === 'blur') && sel) cap = true;
  this.q.forEach(function(el) {
    events = $._setCache_('events', el)[el.cid || 'window'];
    events[ev] || (events[ev] = []);
    cb = function(e) {
      var targ;
      // pass the namespace along to the listener
      if(ns) e.namespace = ns;
      // pass any custom data along to the listener
      if(data) e.data = data;
      // base case is that this is not 'delegated'
      if(!sel) fn.call(el, e);
      // there is a sel, check for matches and call if so.
      else if(~$(el).find(sel).q.indexOf(e.target) || (targ = $.contains(e.target).q[0])) {
        targ || (targ = e.target);
        // as defined by us rather than currentTarget
        e.delegateTarget = targ;
        fn.call(targ, e);
      }
    };
    // cb === ours, fn === theirs.
    events[ev].push({ns: ns, sel: sel, cb: cb, fn: fn, cap: cap});
    el.addEventListener && el.addEventListener(ev, cb, cap);
  });
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
  this.q.forEach(function(el) {el.dispatchEvent && el.dispatchEvent(evt);});
  return this;
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
// ###_hw_
// Abstracted logic for the height and width operations
// `private`
cash._hw_ = function(key, val) {
  var obj = {
    height: {w:'innerHeight',d:'scrollHeight'},
    width: {w:'innerWidth',d:'scrollWidth'}
    }, node = this.q[0], d = isDocument(node) ? node.documentElement : null, 
    w = isWindow(node) ? node: null, type = obj[key], o;
  if(!val) return node ? (w ? w[type.w] : (d ? d[type.d] : (o = this.offset()) && o[key])) : 0;
  this.q.forEach(function(el) {
    el.style[key] = addPx(val);
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
// #is
// As querySelector cannot take psuedo selectors we provide this method to
// easily filter the `q` to elements that do match the passed in selector.
//
// `param` {string} `sel`
// `returns` cash
cash.is = function(sel) {
  this.q = this.q.filter(function(el) {return $.matches(el, sel);});
  return this;
};
// #not
// As querySelector cannot take psuedo selectors we provide this method to
// easily filter the `q` to elements that do not match the passed in selector
//
// `param` {string} `sel`
// `returns` cash
cash.not = function(sel) {
  this.q = this.q.filter(function(el) {return !$.matches(el, sel);});
  return this;
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
  return $(wrap.removeChild(wrap.firstElementChild));
};
// ###remove
// Used to not only remove the elements in the q from the DOM, but to 
// remove any references they have in the $.cache as well.
//
// `returns` cash
cash.remove = function() {
  this.q.forEach(function(el) {
    // not concerned with the display hash
    delete $.cache.events[el.cid];
    el.parentNode && el.parentNode.removeChild(el);
  });
  return this;
};

// ###hide
// Makes elements in the q invisible in the DOM by modifying
// the `display` attribute, if necessary.
//
// `returns` cash
cash.hide = function() {return this._sh_('hide');};
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
    if(!~ary.indexOf(el)) ary.push(el);
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
  this.q.some(function(node) {
    if(node.contains(el)) return res = node;
  });
  return $(res);
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
// ###parent
// Rehydrate the `q` with the parent element of each element in the `q`
// 
// `returns` cash
cash.parent = function() {
  var ary = [], p;
  this.q.forEach(function(el) {
    if(!~ary.indexOf(p = el.parentElement) && p) {
      ary.push(p);
    }
  });
  return $(ary);
};
// ###parents
// Rehydrate the `q` with the ascestor elements of each element in the `q`
// 
// `returns` cash
cash.parents = function() {
  var ary = [], p;
  this.q.forEach(function(el) {
    p = el;
    while((p = p.parentElement) && !isDocument(p)) {
      if(!~ary.indexOf(p)) ary.push(p);
    }
  });
  return $(ary);
};
// ###val
// Set the passed in value on each element in the `q`.
// This method does not function as a getter.
//
// `param` {*} `val`
// `returns` cash
cash.val = function(val) {
  this.q.forEach(function(el) {el.value = val;});
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
      obj[decodeURIComponent(ary[0])] = decodeURIComponent(ary[1]);
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
// ###serialize
// Given a hash of data, convert it to a 'paramaterized' string and return it.
//
// `param` {object} `obj`
// `returns` {string}
cash.serialize = function(obj) {
  var ary = [];
  keys(obj).forEach(function(key) {
    ary.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
  });
  return ary.join('&');
};

// ###getXhr
// While getting a new XMLHttpRequest is standardized now, we are still going
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
  var xhr =  new XMLHttpRequest(), isGet;
  obj.verb || (obj.verb = 'GET');
  isGet = obj.verb === 'GET';
  // check if we need a QS
  if(isGet && obj.params) {
    // assumed to be an object literal if not a string
    if(typeof obj.params !== 'string') obj.params = this.serialize(obj.params);
    obj.url += ('?' + obj.params.replace(/%20/g, '+'));
  }
  xhr.open(obj.verb, obj.url, true, obj.user, obj.password);
  xhr.responseType = obj.responseType || 'text';
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  // so that some common use-case request headers can be set automagically, for blob,
  // document, buffer and others handle manually after getting the xhr back.
  if(xhr.responseType === 'text') {
    // could be json or plain string TODO expand this to a hash lookup for other types later
    if(obj.contentType && obj.contentType === 'json') {
      xhr.setRequestHeader('Accept', 'application/json');
      !isGet && xhr.setRequestHeader('Content-Type', 'application/json');
    } else if(obj.contentType && obj.contentType === 'form') {
      xhr.setRequestHeader('Accept', 'application/json');
      !isGet && xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    } else {
      xhr.setRequestHeader('Accept', 'text/plain');
      !isGet && xhr.setRequestHeader('Content-Type', 'text/plain');
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
// ###xhrHeaders
cash.xhrHeaders = {};
cash.version = "0.1.0";
// Not checking for window, or trying to play nice
window.$ = cash;
}(window));
