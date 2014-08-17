describe('All Api', function() {

  beforeEach(function() {
    $.createElement('<div id="foo" class="bar"></div>').get(0).innerHTML =
      '<div id="baz"><ul><li id="one"></li><li id="two"></li></ul></div><div id="qux"><ul><li id="three"></li><li class="me"></li></ul></div>';
  });

  // ATTR
  it('can set attributes)', function() {
    $.find('li').call('setAttribute', 'data-spam', 'eggs');
    expect($.get(0).getAttribute('data-spam')).toBe('eggs');
    expect($.get(1).getAttribute('data-spam')).toBe('eggs');
    expect($.get(2).getAttribute('data-spam')).toBe('eggs');
    expect($.get(3).getAttribute('data-spam')).toBe('eggs');
  });
  
  it('can get attributes and collect them)', function() {
    $.find('li').call('setAttribute', 'data-spam', 'vikings');
    expect($.collect('getAttribute', 'data-spam')).toEqual(['vikings','vikings','vikings','vikings']);
  });
  
  it('can remove attributes)', function() {
    $.find('li').call('setAttribute', 'data-spam', 'eggs');
    expect($.collect('getAttribute', 'data-spam')).toEqual(['eggs','eggs','eggs','eggs']);
    $.call('removeAttribute', 'data-spam');
    expect($.collect('getAttribute', 'data-spam')).toEqual([null,null,null,null]);
  });
  
  // CLASS
  it('can invoke classlist add', function() {
    $.find('li').call('classList.add', 'ni');
    expect($.get(0).classList.contains('ni')).toBe(true);
    expect($.get(1).classList.contains('ni')).toBe(true);
    expect($.get(2).classList.contains('ni')).toBe(true);
    expect($.get(3).classList.contains('ni')).toBe(true);
  });
  
  it('can invoke classlist contains and remove', function() {
    $.find('li').call('classList.add', 'shrubber');
    expect($.collect('classList.contains', 'shrubber')).toEqual([true,true,true,true]);
  });

  it('can assign a value', function() {
    $.find('li');
    expect($.get(0).checked).toBeFalsy();
    expect($.get(1).checked).toBeFalsy();
    expect($.get(2).checked).toBeFalsy();
    expect($.get(3).checked).toBeFalsy();
    $.assign('checked', true);
    expect($.get(0).checked).toBe(true);
    expect($.get(1).checked).toBe(true);
    expect($.get(2).checked).toBe(true);
    expect($.get(3).checked).toBe(true);
  });

  it('can retrieve the return values of many elements with a series of methods', function() {
    $.q[0].querySelector('li:first-child').setAttribute('data-spam', 'eggs');
    var ret = $.find('li').collect('getAttribute', 'data-spam');
    expect(ret[0]).toBe('eggs');
    expect(ret[1]).toBe(null);
    expect(ret[2]).toBe(null);
    expect(ret[3]).toBe(null);
  });

  it('can retrieve the return values of many elements with a series of methods', function() {
    $.q[0].querySelector('li:first-child').classList.add('eggs');
    var ret = $.find('li').collect('classList.contains', 'eggs');
    expect(ret[0]).toBe(true);
    expect(ret[1]).toBe(false);
    expect(ret[2]).toBe(false);
    expect(ret[3]).toBe(false);
  });

});
