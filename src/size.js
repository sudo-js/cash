// ###offset
// Get a hash of key:value pairs: `top`, `left`, `width` and `height` - representing
// the position in the document of the 0th element in the q. This method is a getter only
// (use `css()` as a setter). Takes into consideration the page[X|Y]Offsets for
// `left` and `top` as well as rounds the width and height
//
// `returns` {object}
cash.offset = function() {
  if(!this.q.length) return null;
  var obj = this.q[0].getBoundingClientRect();
  return {
    left: obj.left + window.pageXOffset,
    top: obj.top + window.pageYOffset,
    width: Math.round(obj.width),
    height: Math.round(obj.height)
  };
};
