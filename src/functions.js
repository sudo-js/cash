const cssNum = {'column-count':1,'columns':1,'font-weight':1,'line-height':1,'opacity': 1,'z-index':1,'zoom':1};
let _matchesSelector_;

export const slice = Array.prototype.slice;
export const isArray = Array.isArray;
export const keys = Object.keys;

// When calling addPx, send value first as there may be no key
export function addPx(v, k) {return (typeof v === 'number' && (!k || !cssNum[k])) ? v + 'px' : v;}

// function cash(arg) {return cash.init(arg);}

export function isDocument(arg) {return arg && arg.nodeType === arg.DOCUMENT_NODE;}
export function isFunction(arg) { return typeof arg === 'function'; }
export function isObject(arg) {return Object.prototype.toString.call(arg) === '[object Object]';}
export function isString(arg) {return typeof arg === 'string';}
export function isWindow(arg) {return arg === window;}

// ### createElement
// * Given a string, create a nested DOM element. Notice
// that the input must be a single 'top-level' Element, but it may contain
// any number of children.
//
// * `param` {string} `str`. An innerHTML compatible string
//
// * `returns` {element}
//
// * __NOTE__ this is not attached to $ in any way.
export function createElement(str) {
  let wrap = document.createElement('div');
  wrap.innerHTML = str;
  return wrap.removeChild(wrap.firstElementChild);
}

// ###matches
// Unfortunately the matchesSelector methods are all hidden behind prefixes ATM.
// set the useable one, if not, then return the bool.
//
// `param` {element} `el`. A DOM 1 nodetype
//
// `param` {string}  `sel`. A CSS selector
//
// `returns` {bool}
//
// * __NOTE__ this is not attached to $ in any way.
export function matches(el, sel) {
  if (el.nodeType !== 1) return false;
  const proto = Element.prototype;
  // normalize the native selector match fn until all the prefixes are dropped
  if(!_matchesSelector_) {
    _matchesSelector_ = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector ||
      proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
  }
  return _matchesSelector_.call(el, sel);
}