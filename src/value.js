// ###setValue
// Set the passed in value on each element in the `q`.
// This method does not function as a getter.
//
// `param` {*} `val`
//
// `returns` cash
cash.setValue = function(val) {
  this.q.forEach(function(el) {el.value = val;});
  return this;
};
