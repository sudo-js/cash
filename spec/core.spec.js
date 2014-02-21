describe('Core $', function() {
  
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
  
  it('can create an element with class and id', function() {
    $.create('<div id="foo" class="bar"></div>');
    expect($.q[0].id).toBe('foo');
    expect($.q[0].classList.contains('bar')).toBe(true);
  });
  
  it('can rebuild the q to a specified selector via find', function() {
    $.q[0].innerHTML = '<div id="baz"><ul><li></li><li></li></ul></div><div id="qux"><ul><li></li><li class="me"></li></ul></div>';
    expect($.find('div').q.length).toBe(2);
    expect($.find('li').q.length).toBe(4);
  });
  
  it('can reduce the q to a specified el via find', function() {
    $.q[0].innerHTML = '<div id="baz"><ul><li></li><li></li></ul></div><div id="qux"><ul><li></li><li class="me"></li></ul></div>';
    expect($.find('.me').q.length).toBe(1);
  });
  
  it('can reduce the q to a specified selectors parent via contains', function() {
    $.q[0].innerHTML = '<div id="baz"><ul><li></li><li></li></ul></div><div id="qux"><ul><li></li><li class="me"></li></ul></div>';
    var parent = $.q[0].querySelectorAll('div')[1],
      me = parent.querySelector('.me');
    expect($.find('div').contains(me).q.length).toBe(1);
    expect($.q[0]).toEqual(parent);
  });
});

