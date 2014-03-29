describe('Core $', function() {
  
  beforeEach(function() {
    $.create('<div id="foo" class="bar"></div>').get(0).innerHTML =
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
  
  it('can rebuild the q to a specified selector via find', function() {
    expect($.find('div').q.length).toBe(2);
    expect($.find('li').q.length).toBe(4);
  });
  
  it('can reduce the q to a specified el via find', function() {
    expect($.find('.me').q.length).toBe(1);
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
  
  it('can reduce the q to a specified selectors parent via contains', function() {
    var parent = $.q[0].querySelectorAll('div')[1],
      me = parent.querySelector('.me');
    expect($.find('div').contains(me).q.length).toBe(1);
    expect($.q[0]).toEqual(parent);
  });
  
  it('uses closest to reduce the q to those matching parents', function() {
     var ul = $.q[0].querySelector('#qux').querySelector('ul');
     expect($.find('li.me').closest('ul').q[0]).toEqual(ul);
  });
  
  it('when using closest, does not insert copies', function() {
     expect($.find('li').closest('ul').q.length).toEqual(2);
  });
  
  it('removes cache entries for an element removed with remove', function() {
    var div = $.q[0];
    expect($(div).find('li').q.length).toBe(4);
    $(div).find('li.me').on('click', $.noop);
    expect($.cache.events[$.q[0].cid]).toBeTruthy();
    $(div).find('li.me').remove();
    expect($(div).find('li').q.length).toBe(3);
    expect($.cache.events[$.q[0].cid]).toBeFalsy();
  });
  
  it('reduces the q via not', function() {
    expect($.find('div').q.length).toBe(2);
    expect($.not('div#baz').q.length).toBe(1);
  });
  
  it('rehydrates the q with parent elements via parent', function() {
    expect($.find('li').parent().get().length).toBe(2);
    expect($.get(0).tagName).toBe('UL');
    expect($.get(1).tagName).toBe('UL');
  });
  
  it('rehydrates the q with parents via parents, fragment', function() {
    expect($.find('li:first-child').parents().get().length).toBe(5);
  });
  
  it('rehydrates the q with parents via parents, non fragment', function() {
    var tt = document.querySelector('#testTarget');
    tt.appendChild($.get(0));
    expect($(tt).find('li#one').parents().get().length).toBe(6);
  });
  
  it('can set a single attribute on each el in the q via attr', function() {
    $.find('li').attr('data-spam', 'eggs');
    expect($.get(0).getAttribute('data-spam')).toBe('eggs');
    expect($.get(1).getAttribute('data-spam')).toBe('eggs');
    expect($.get(2).getAttribute('data-spam')).toBe('eggs');
    expect($.get(3).getAttribute('data-spam')).toBe('eggs');
  });
  
  it('can set multiple attributes at once via attr', function() {
    $.find('li').attr({'data-foo': 'bar', dir: 'rtl'});
    expect($.get(0).getAttribute('data-foo')).toBe('bar');
    expect($.get(0).getAttribute('dir')).toBe('rtl');
    expect($.get(1).getAttribute('data-foo')).toBe('bar');
    expect($.get(1).getAttribute('dir')).toBe('rtl');
    expect($.get(2).getAttribute('data-foo')).toBe('bar');
    expect($.get(2).getAttribute('dir')).toBe('rtl');
    expect($.get(3).getAttribute('data-foo')).toBe('bar');
    expect($.get(3).getAttribute('dir')).toBe('rtl');
  });
  
  it('can set a single value with val', function() {
    $.create('<div><input id="a" type="text"></input><input id="b" type="text"></input></div>');
    var d = $.get(0);
    expect(d.querySelector('#a').value).toBeFalsy();
    $.find('#a').val('foo');
    expect(d.querySelector('#a').value).toBe('foo');
  });
  
  it('can set multiple values with val', function() {
    $.create('<div><input id="a" type="text"></input><input id="b" type="text"></input></div>');
    var d = $.get(0);
    expect(d.querySelector('#a').value).toBeFalsy();
    expect(d.querySelector('#b').value).toBeFalsy();
    $.find('#a, #b').val('bar');
    expect(d.querySelector('#a').value).toBe('bar');
    expect(d.querySelector('#b').value).toBe('bar');
  });
});

