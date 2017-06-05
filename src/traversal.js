import { isDocument, matches } from './functions';

// ### closest
// * Given a string selector, return the first parent node that matches it
// for each element in the q.
//
// * `param` {string} `sel`
//
// * `returns` cash
export function closest(sel) {
  let ary = [];
  this.q.forEach(function(el) {
    while(el && !matches(el, sel)) el = !isDocument(el) && el.parentNode;
    if(el && !~ary.indexOf(el)) ary.push(el);
  });
  return this.init(ary);
}
// ### contains
// * See if any element in the current q contains the passed in element,
// setting the q as the container if found.
//
// * `param` {element} `el`
//
// * `returns` cash
export function contains(el) {
  let res;
  this.q.some(function(node) {
    if(node.contains(el)) return res = node;
  });
  return this.init(res);
}
// ### find
// * From the existing q, rebuild it by performing a querySelectorAll
// with the given selector on each element in the q, pushing those elements
// found into the new q.
//
// * `param` {string} `sel`
//
// * `returns` cash
export function find(sel) {
  let ary = [];
  function fn(n) {ary.push(n);}
  this.q.forEach(function(el) {
    if(el.querySelectorAll) Array.prototype.forEach.call(el.querySelectorAll(sel),fn);
  });
  return this.init(ary);
}
// ### parent
// * Rehydrate the `q` with the parent element of each element in the `q`
// 
// * `returns` cash
export function parent() {
  let ary = [], p;
  this.q.forEach(function(el) {
    if(!~ary.indexOf(p = el.parentElement) && p) ary.push(p);
  });
  return this.init(ary);
}
// ### parents
// * Rehydrate the `q` with the ascestor elements of each element in the `q`
// 
// * `returns` cash
export function parents() {
  let ary = [], p;
  this.q.forEach(function(el) {
    p = el;
    while((p = p.parentElement) && !isDocument(p)) {
      if(!~ary.indexOf(p)) ary.push(p);
    }
  });
  return this.init(ary);
}
