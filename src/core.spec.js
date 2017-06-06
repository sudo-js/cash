const $$ = require('./index').cash;
const $ = $$.init.bind($$);

const createElement = require('./functions').createElement;
const isObject = require('./functions').isObject;

describe('Core', function() {
  
  beforeEach(function() {
    let el = createElement('<div id="foo" class="bar"><div id="baz"><ul><li id="one"></li><li id="two"></li></ul></div><div id="qux"><ul><li id="three"></li><li class="me"></li></ul></div></div>');
    $(el);
  });
  
  it('is available globally as $(init) and $$(cash instance)', function() {
    expect($).toBeTruthy();
    expect(typeof $).toBe('function');
    expect($$).toBeTruthy();
    expect(isObject($$)).toBe(true);
  });
  
  it('stores a single element as query', function() {
    var el = document.createElement('div');
    $(el);
    expect(Array.isArray($$.q)).toBe(true);
    expect($$.q[0]).toBe(el);
    expect($$.q.length).toBe(1);
  });
  
  it('slices a NodeList into an array at $.q', function() {
    var ul = document.createElement('ul');
    ul.innerHTML = '<li></li><li></li><li></li>';
    $(ul.querySelectorAll('li'));
    expect(Array.isArray($$.q)).toBe(true);
    expect($$.q.length).toBe(3);
  });
  
  it('assigns an empty array to q when passed a falsey arg', function() {
    $(undefined);
    expect(Array.isArray($$.q)).toBe(true);
    expect($$.q.length).toBe(0);
  });
  
  it('assigns the empty array passed to it as q when passed one', function() {
    var ary = [];
    $(ary);
    expect(Array.isArray($$.q)).toBe(true);
    expect($$.q.length).toBe(0);
    expect($$.q).toBe(ary);
  });
  
  it('can create an element with class and id', function() {
    expect($$.q[0].id).toBe('foo');
    expect($$.q[0].classList.contains('bar')).toBe(true);
  });
  
  it('fetches various from the q via get', function() {
    expect(Array.isArray($$.find('li').get())).toBe(true);
    expect($$.get(0).id).toBe('one');  
    expect($$.get(1).id).toBe('two');
    expect($$.get(2).id).toBe('three'); 
    expect($$.get(-2).id).toBe('three');
    expect($$.get(3).classList.contains('me')).toBe(true);  
    expect($$.get(-1).classList.contains('me')).toBe(true);
  });
  
  it('can return a unique identifier', function() {
    var current = $$._cid_, next = $$.getUid();
    expect(parseInt(next, 10) - 1).toBe(current);
    var prefixed = $$.getUid('foo'), comp = 'foo' + (current + 2);
    expect(prefixed).toBe(comp);
  });
  
});