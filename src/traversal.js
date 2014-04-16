/*global isDocument proto isDocument*/

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
    if(!~ary.indexOf(p = el.parentElement) && p) ary.push(p);
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
