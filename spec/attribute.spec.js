describe('Attribute', function() {
  
  beforeEach(function() {
    $.createElement('<div id="foo" class="bar"></div>').get(0).innerHTML =
      '<div id="baz"><ul><li id="one"></li><li id="two"></li></ul></div><div id="qux"><ul><li id="three"></li><li class="me"></li></ul></div>';
  });
  
  it('can set a single attribute on each el in the q via attr', function() {
    $.find('li').setAttribute('data-spam', 'eggs');
    expect($.get(0).getAttribute('data-spam')).toBe('eggs');
    expect($.get(1).getAttribute('data-spam')).toBe('eggs');
    expect($.get(2).getAttribute('data-spam')).toBe('eggs');
    expect($.get(3).getAttribute('data-spam')).toBe('eggs');
  });
  
  it('can set multiple attributes at once via attr', function() {
    $.find('li').setAttribute({'data-foo': 'bar', dir: 'rtl'});
    expect($.get(0).getAttribute('data-foo')).toBe('bar');
    expect($.get(0).getAttribute('dir')).toBe('rtl');
    expect($.get(1).getAttribute('data-foo')).toBe('bar');
    expect($.get(1).getAttribute('dir')).toBe('rtl');
    expect($.get(2).getAttribute('data-foo')).toBe('bar');
    expect($.get(2).getAttribute('dir')).toBe('rtl');
    expect($.get(3).getAttribute('data-foo')).toBe('bar');
    expect($.get(3).getAttribute('dir')).toBe('rtl');
  });
  
  it('can remove a single attribute on each el in the q via attr', function() {
    $.find('li').setAttribute('data-spam', 'eggs');
    expect($.get(0).getAttribute('data-spam')).toBe('eggs');
    expect($.get(1).getAttribute('data-spam')).toBe('eggs');
    expect($.get(2).getAttribute('data-spam')).toBe('eggs');
    expect($.get(3).getAttribute('data-spam')).toBe('eggs');
    
    $.removeAttribute('data-spam');
    expect($.get(0).getAttribute('data-spam')).toBeFalsy();
    expect($.get(1).getAttribute('data-spam')).toBeFalsy();
    expect($.get(2).getAttribute('data-spam')).toBeFalsy();
    expect($.get(3).getAttribute('data-spam')).toBeFalsy();
  });
  
  it('can unset multiple attributes at once via attr', function() {
    $.find('li').setAttribute({'data-foo': 'bar', dir: 'rtl'});
    expect($.get(0).getAttribute('data-foo')).toBe('bar');
    expect($.get(0).getAttribute('dir')).toBe('rtl');
    expect($.get(1).getAttribute('data-foo')).toBe('bar');
    expect($.get(1).getAttribute('dir')).toBe('rtl');
    expect($.get(2).getAttribute('data-foo')).toBe('bar');
    expect($.get(2).getAttribute('dir')).toBe('rtl');
    expect($.get(3).getAttribute('data-foo')).toBe('bar');
    expect($.get(3).getAttribute('dir')).toBe('rtl');
    
    $.removeAttribute(['data-foo', 'dir']);
    expect($.get(0).getAttribute('data-foo')).toBeFalsy();
    expect($.get(0).getAttribute('dir')).toBeFalsy();
    expect($.get(1).getAttribute('data-foo')).toBeFalsy();
    expect($.get(1).getAttribute('dir')).toBeFalsy();
    expect($.get(2).getAttribute('data-foo')).toBeFalsy();
    expect($.get(2).getAttribute('dir')).toBeFalsy();
    expect($.get(3).getAttribute('data-foo')).toBeFalsy();
    expect($.get(3).getAttribute('dir')).toBeFalsy();
  });
});