/*global cash*/

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
