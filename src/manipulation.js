/*global proto*/

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
  function rem(el) {if(el.cid) delete $.cache.events[el.cid];}
  this.q.forEach(function(el) {
    // children of el need to be unset first first
    proto.forEach.call(el.childNodes, function(node) {rem(node);});
    // now the parent
    rem(el);
    el.parentNode && el.parentNode.removeChild(el);
  });
  return this;
};
