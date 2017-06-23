// Style = [core, traversal, cca, events, isNot]
import Style from './style';

export default class extends Style {
  // ###offset
  // Get a hash of key:value pairs: `top`, `left`, `width` and `height` - representing
  // the position in the document of the 0th element in the q. This method is a getter only
  // (use `css()` as a setter). Takes into consideration the page[X|Y]Offsets for
  // `left` and `top` as well as rounds the width and height
  //
  // `returns` {object}
  offset() {
    if(!this.q.length) return null;
    const obj = this.q[0].getBoundingClientRect();
    let offset =  {
      left: obj.left + window.pageXOffset,
      top: obj.top + window.pageYOffset,
      width: Math.round(obj.width),
      height: Math.round(obj.height)
    };
    
    offset.right = offset.left + offset.width;
    offset.bottom = offset.top + offset.height;
    
    return offset;
  }
}
