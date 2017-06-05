const cssNum = {'column-count':1,'columns':1,'font-weight':1,'line-height':1,'opacity': 1,'z-index':1,'zoom':1};

export const slice = Array.prototype.slice;

// When calling addPx, send value first as there may be no key
export function addPx(v, k) {return (typeof v === 'number' && (!k || !cssNum[k])) ? v + 'px' : v;}

// function cash(arg) {return cash.init(arg);}

export function isDocument(arg) {return arg && arg.nodeType === arg.DOCUMENT_NODE;}
export function isFunction(arg) { return typeof arg === 'function'; }
export function isObject(arg) {return Object.prototype.toString.call(arg) === '[object Object]';}
export function isString(arg) {return typeof arg === 'string';}
export function isWindow(arg) {return arg === window;}