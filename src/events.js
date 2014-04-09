/*global isWindow*/

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
