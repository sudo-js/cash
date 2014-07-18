describe('All Api', function() {

  beforeEach(function() {
    $.createElement('<div id="foo" class="bar"></div>').get(0).innerHTML =
      '<div id="baz"><ul><li id="one"></li><li id="two"></li></ul></div><div id="qux"><ul><li id="three"></li><li class="me"></li></ul></div>';
  });

  it('can send a native method to each element in q via all(nativeMethodName)', function() {
    $.find('li').all('setAttribute', 'data-spam', 'eggs');
    expect($.get(0).getAttribute('data-spam')).toBe('eggs');
    expect($.get(1).getAttribute('data-spam')).toBe('eggs');
    expect($.get(2).getAttribute('data-spam')).toBe('eggs');
    expect($.get(3).getAttribute('data-spam')).toBe('eggs');
  });

  it('can send series of native methods', function() {
    $.find('li').all('classList.add', 'eggs');
    expect($.get(0).classList.contains('eggs')).toBe(true);
    expect($.get(1).classList.contains('eggs')).toBe(true);
    expect($.get(2).classList.contains('eggs')).toBe(true);
    expect($.get(3).classList.contains('eggs')).toBe(true);
  });

  it('can retrieve the return values of many elements with a series of methods', function() {
    $.q[0].querySelector('li:first-child').setAttribute('data-spam', 'eggs');
    var ret = $.find('li').getAll('getAttribute', 'data-spam');
    expect(ret[0]).toBe('eggs');
    expect(ret[1]).toBe(null);
    expect(ret[2]).toBe(null);
    expect(ret[3]).toBe(null);
  });

  it('can retrieve the return values of many elements with a series of methods', function() {
    $.q[0].querySelector('li:first-child').classList.add('eggs');
    var ret = $.find('li').getAll('classList.contains', 'eggs');
    expect(ret[0]).toBe(true);
    expect(ret[1]).toBe(false);
    expect(ret[2]).toBe(false);
    expect(ret[3]).toBe(false);
  });

});
