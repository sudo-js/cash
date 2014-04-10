describe('*Class methods', function() {
  
  beforeEach(function() {
    var el = $.create('<div id="foo" class="bar"></div>').q[0];
    el.innerHTML = '<div id="baz"><ul><li></li><li></li></ul></div><div id="qux"><ul><li></li><li class="me"></li></ul></div>';
  });
  
  afterEach(function() {
    $(document.querySelector('#testTarget')).hide();
  });
  
  it('can add a single class with addClass', function() {
    $.find('ul').addClass('imaul');
    expect($.get(0).classList.contains('imaul')).toBe(true);
    expect($.get(1).classList.contains('imaul')).toBe(true);    
  });
  
  it('can add multiple classes with addClass', function() {
    $.find('ul').addClass('imaul reallyiam');
    expect($.get(0).classList.contains('imaul')).toBe(true);
    expect($.get(0).classList.contains('reallyiam')).toBe(true);
    expect($.get(1).classList.contains('imaul')).toBe(true);
    expect($.get(1).classList.contains('reallyiam')).toBe(true);    
  });
  
  it('can remove a single class with removeClass', function() {
    expect($.get(0).classList.contains('bar')).toBe(true);
    $.removeClass('bar');
    expect($.get(0).classList.contains('bar')).toBe(false);    
  });
  
  it('can remove multiple classes with removeClass', function() {
    $.find('ul').addClass('imaul reallyiam');
    expect($.get(0).classList.contains('imaul')).toBe(true);
    expect($.get(0).classList.contains('reallyiam')).toBe(true);
    expect($.get(1).classList.contains('imaul')).toBe(true);
    expect($.get(1).classList.contains('reallyiam')).toBe(true);
    $.removeClass('reallyiam imaul');
    expect($.get(0).classList.contains('imaul')).toBe(false);
    expect($.get(0).classList.contains('reallyiam')).toBe(false);
    expect($.get(1).classList.contains('imaul')).toBe(false);
    expect($.get(1).classList.contains('reallyiam')).toBe(false);
  });
  
  it('can toggle a single class with toggleClass', function() {
    expect($.get(0).classList.contains('bar')).toBe(true);
    $.toggleClass('bar');
    expect($.get(0).classList.contains('bar')).toBe(false);
    $.toggleClass('bar');
    expect($.get(0).classList.contains('bar')).toBe(true);  
  });
  
  it('can toggle multiple classes with toggleClass', function() {
    $.get(0).querySelector('div#baz ul').classList.add('imaul');
    $.get(0).querySelector('div#qux ul').classList.add('reallyiam');
    $.find('ul');
    expect($.get(0).classList.contains('imaul')).toBe(true);
    expect($.get(0).classList.contains('reallyiam')).toBe(false);
    expect($.get(1).classList.contains('imaul')).toBe(false);
    expect($.get(1).classList.contains('reallyiam')).toBe(true);
    $.toggleClass('reallyiam imaul');
    expect($.get(0).classList.contains('imaul')).toBe(false);
    expect($.get(0).classList.contains('reallyiam')).toBe(true);
    expect($.get(1).classList.contains('imaul')).toBe(true);
    expect($.get(1).classList.contains('reallyiam')).toBe(false);
  });
});