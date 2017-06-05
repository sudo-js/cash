import { slice } from './functions';

// ### createElement
// * Given a string, create a DOM element and store place in at the q. Notice
// that the input must be a single 'top-level' Element, but it may contain
// any number of children.
//
// * `param` {string} `str`. An innerHTML compatible string
//
// * `returns` cash
export function createElement(str) {
  let wrap = document.createElement('div');
  wrap.innerHTML = str;
  return this.init(wrap.removeChild(wrap.firstElementChild));
}
// ### remove
// * Used to not only remove the elements in the q from the DOM, but to 
// remove any references they have in the $.cache as well.
//
// * `returns` cash
export function remove() {
  function rem(el) {delete this.cache.events[el.getAttribute('cid')];}
  this.q.forEach(function(el) {
    // unset any children
    slice.call(el.querySelectorAll('[cid]')).forEach(rem);
    // now the top-level parent
    rem(el);
    el.parentNode && el.parentNode.removeChild(el);
  });
  return this;
}
