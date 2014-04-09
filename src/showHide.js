/*global slice*/

// ###hide
// Makes elements in the q invisible in the DOM by modifying
// the `display` attribute, if necessary.
//
// `returns` cash
cash.hide = function() {return this._sh_('hide');};
// ###show
// Makes elements in the q visible in the DOM by modifying
// the `display` attribute, if necessary.
//
// `returns` cash
cash.show = function() {return this._sh_('show');};
// ###_sh_
// Abstracted logic for the show and hide methods
// `private`
cash._sh_ = function(key) {
  var isShow = key === 'show';
  function state(el) {return isShow ? getComputedStyle(el).display !== 'none' : getComputedStyle(el).display === 'none';}
  function none(arg) {return isShow ? arg !== 'none': arg === 'none';}
  function notNone(arg) {return isShow ? arg === 'none': arg !== 'none';}

  this.q.forEach(function(el) {
    var display = $._setCache_('display', el),
      old = display[el.cid];
    if(state(el)) {
      if(none(old)) delete display[el.cid];
    // does an old display value exist?
    } else if (old && none(old)) {
      el.style.display = old;
      delete display[el.cid];
    // the element is not visible and does not have an old display value
    } else {
      // is the element hidden with inline styling?
      if(el.style.display && notNone(el.style.display)) {
        display[el.cid] = el.style.display;
        el.style.display = isShow ? '' : 'none';
      // the element is hidden through css
      } else el.style.display = isShow ? 'block': 'none';
    }
  });
  return this;
};
// ###toggle
// Toggles the visibility of elements in the DOM by modifying
// the `display` attribute, if necessary.
//
// `returns` cash
cash.toggle = function() {
  var ary = slice.call(this.q);
  ary.forEach(function(el) {
    getComputedStyle(el).display === 'none' ?
      $(el).show() : $(el).hide();
  });
  return $(ary);
};
