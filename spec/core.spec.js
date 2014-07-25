describe('Core', function() {
  
  beforeEach(function() {
    $.createElement('<div id="foo" class="bar"></div>').get(0).innerHTML =
      '<div id="baz"><ul><li id="one"></li><li id="two"></li></ul></div><div id="qux"><ul><li id="three"></li><li class="me"></li></ul></div>';
  });
  
  it('is available globally as $', function() {
    expect(window.$).toBeTruthy();
  });
  
  it('stores a single element as query', function() {
    var el = document.querySelector('#testTarget');
    $(el);
    expect(Array.isArray($.q)).toBe(true);
    expect($.q[0]).toBe(el);
    expect($.q.length).toBe(1);
  });
  
  it('slices a NodeList into an array at $.q', function() {
    var ul = document.createElement('ul');
    ul.innerHTML = '<li></li><li></li><li></li>';
    $(ul.querySelectorAll('li'));
    expect(Array.isArray($.q)).toBe(true);
    expect($.q.length).toBe(3);
  });
  
  it('assigns an empty array to q when passed a falsey arg', function() {
    $(undefined);
    expect(Array.isArray($.q)).toBe(true);
    expect($.q.length).toBe(0);
  });
  
  it('assigns the empty array passed to it as q when passed one', function() {
    var ary = [];
    $(ary);
    expect(Array.isArray($.q)).toBe(true);
    expect($.q.length).toBe(0);
    expect($.q).toBe(ary);
  });
  
  it('can create an element with class and id', function() {
    expect($.q[0].id).toBe('foo');
    expect($.q[0].classList.contains('bar')).toBe(true);
  });
  
  it('fetches various from the q via get', function() {
    expect(Array.isArray($.find('li').get())).toBe(true);
    expect($.get(0).id).toBe('one');  
    expect($.get(1).id).toBe('two');
    expect($.get(2).id).toBe('three'); 
    expect($.get(-2).id).toBe('three');
    expect($.get(3).classList.contains('me')).toBe(true);  
    expect($.get(-1).classList.contains('me')).toBe(true);
  });
  
});

