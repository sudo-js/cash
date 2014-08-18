describe('Value', function() {
  
  beforeEach(function() {
    $.createElement('<div id="foo" class="bar"></div>').get(0).innerHTML =
      '<div id="baz"><ul><li id="one"></li><li id="two"></li></ul></div><div id="qux"><ul><li id="three"></li><li class="me"></li></ul></div>';
  });
  
  it('can set a single value with val', function() {
    $.createElement('<div><input id="a" type="text"></input><input id="b" type="text"></input></div>');
    var d = $.get(0);
    expect(d.querySelector('#a').value).toBeFalsy();
    $.find('#a').setValue('foo');
    expect(d.querySelector('#a').value).toBe('foo');
  });
  
  it('can set multiple values with val', function() {
    $.createElement('<div><input id="a" type="text"></input><input id="b" type="text"></input></div>');
    var d = $.get(0);
    expect(d.querySelector('#a').value).toBeFalsy();
    expect(d.querySelector('#b').value).toBeFalsy();
    $.find('#a, #b').setValue('bar');
    expect(d.querySelector('#a').value).toBe('bar');
    expect(d.querySelector('#b').value).toBe('bar');
  });
  
});