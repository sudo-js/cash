import { isString, keys, addPx } from './functions';
// IsNot = [core, traversal, cca, events]
import IsNot from './is-not';

export default class extends IsNot {
  // ###style
  // Given a key and a value, or a hash of key:value pairs, set each on the style property of
  // each element in the `q`.
  // This method does not function as a getter (use getComputedStyle for that).
  //
  // `param` {string|object} `key`
  //
  // `param` {string} `val`. Used if `key` is not an object
  //
  // `returns` cash
  style(key, val) {
    let ary = isString(key) ? undefined : keys(key),
      set = ary ? function(el) {ary.forEach(function(i) {el.style[i] = addPx(key[i], i);});} :
        function(el) {el.style[key] = addPx(val, key);};
        
    this.q.forEach(set);
    return this;
  }
}