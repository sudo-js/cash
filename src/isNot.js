// ###is
// As querySelector cannot take psuedo selectors we provide this method to
// easily filter the `q` to elements that do match the passed in selector.
//
// `param` {string} `sel`
//
// `returns` cash
cash.is = function(sel) {
  this.q = this.q.filter(function(el) {return $.matches(el, sel);});
  return this;
};
// ###not
// As querySelector cannot take psuedo selectors we provide this method to
// easily filter the `q` to elements that do not match the passed in selector
//
// `param` {string} `sel`
//
// `returns` cash
cash.not = function(sel) {
  this.q = this.q.filter(function(el) {return !$.matches(el, sel);});
  return this;
};
