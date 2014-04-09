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
