const $$ = require('./index').$$;
const $ = require('./index').$;

const createElement = require('./functions').createElement;

describe('Call, Collect, Assign API', function() {

  beforeEach(function() {
    let el = createElement('<div id="foo" class="bar"><div id="baz"><ul><li id="one"></li><li id="two"></li></ul></div><div id="qux"><ul><li id="three"></li><li class="me"></li></ul></div></div>');
    $(el);
  });

  // ATTR
  it('can set attributes', function() {
    $$.find('li').call('setAttribute', 'data-spam', 'eggs');
    expect($$.get(0).getAttribute('data-spam')).toBe('eggs');
    expect($$.get(1).getAttribute('data-spam')).toBe('eggs');
    expect($$.get(2).getAttribute('data-spam')).toBe('eggs');
    expect($$.get(3).getAttribute('data-spam')).toBe('eggs');
  });

  it('can get attributes and collect them', function() {
    $$.find('li').call('setAttribute', 'data-spam', 'vikings');
    expect($$.collect('getAttribute', 'data-spam')).toEqual(['vikings','vikings','vikings','vikings']);
  });

  it('can remove attributes', function() {
    $$.find('li').call('setAttribute', 'data-spam', 'eggs');
    expect($$.collect('getAttribute', 'data-spam')).toEqual(['eggs','eggs','eggs','eggs']);
    $$.call('removeAttribute', 'data-spam');
    expect($$.collect('getAttribute', 'data-spam')).toEqual([null,null,null,null]);
  });

  // CLASS
  it('can invoke classlist add', function() {
    $$.find('li').call('classList.add', 'ni');
    expect($$.get(0).classList.contains('ni')).toBe(true);
    expect($$.get(1).classList.contains('ni')).toBe(true);
    expect($$.get(2).classList.contains('ni')).toBe(true);
    expect($$.get(3).classList.contains('ni')).toBe(true);
  });

  it('can invoke classlist contains and remove', function() {
    $$.find('li').call('classList.add', 'shrubber');
    expect($$.collect('classList.contains', 'shrubber')).toEqual([true,true,true,true]);
    expect($$.call('classList.remove', 'shrubber').collect('classList.contains', 'shrubber'))
      .toEqual([false,false,false,false]);
  });

  it('can invoke classlist toggle', function() {
    $$.find('li');
    $$.get(1).classList.add('caerbannog');
    $$.get(3).classList.add('caerbannog');
    expect($$.collect('classList.contains', 'caerbannog')).toEqual([false,true,false,true]);
    // flip them
    expect($$.call('classList.toggle', 'caerbannog').collect('classList.contains', 'caerbannog'))
      .toEqual([true,false,true,false]);
  });

  // VAL
  it('can assign a value', function() {
    expect($$.find('li').collect('checked')).toEqual([undefined,undefined,undefined,undefined]);
    expect($$.assign('checked', true).collect('checked')).toEqual([true,true,true,true]);
  });

});