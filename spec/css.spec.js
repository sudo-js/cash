describe('CSS methods', function() {
  
  beforeEach(function() {
    var el = $.create('<div id="foo" class="bar"></div>').q[0];
    el.innerHTML = '<div id="baz"><ul><li></li><li></li></ul></div><div id="qux"><ul><li></li><li class="me"></li></ul></div>';
      
    $(document.querySelector('#testTarget')).show().get(0).appendChild(el);
    $(document.querySelector('#foo'));
  });
  
  afterEach(function() {
    $(document.querySelector('#testTarget')).hide();
  });
  
  it('can get/set a height/width on foo', function() {
    $.height(50);
    expect($.q[0].style.height).toBe('50px');
    expect($.height()).toBe(50);
    
    $.width(100);
    expect($.q[0].style.width).toBe('100px');
    expect($.width()).toBe(100);
  });
  
  it('can set height and width on multiple elements', function() {
    $.find('li').height(30);
    expect($.q[0].style.height).toBe('30px');
    expect($.q[1].style.height).toBe('30px');
    expect($.q[2].style.height).toBe('30px');
    expect($.q[3].style.height).toBe('30px');
    
    $.width(100);
    expect($.q[0].style.width).toBe('100px');
    expect($.q[1].style.width).toBe('100px');
    expect($.q[2].style.width).toBe('100px');
    expect($.q[3].style.width).toBe('100px');
    
    // getter works on the 0th element
    expect($.height()).toBe(30);
    expect($.width()).toBe(100);
  });
  
  it('can set a single style on foo', function() {
    $.css('backgroundColor', 'green');
    expect($.q[0].style.backgroundColor).toBe('green');
  });
  
  it('can set multiple styles on foo', function() {
    $.css({color: '#666', 'textAlign': 'right', padding: 2});
    expect($.q[0].style.color).toBe('rgb(102, 102, 102)');
    expect($.q[0].style.textAlign).toBe('right');
    expect($.q[0].style.padding).toBe('2px');
  });
  
  it('can set a single style on multiple elements', function() {
    $.find('li').css('backgroundColor', 'blue');
    expect($.q[0].style.backgroundColor).toBe('blue');
    expect($.q[1].style.backgroundColor).toBe('blue');
    expect($.q[2].style.backgroundColor).toBe('blue');
    expect($.q[3].style.backgroundColor).toBe('blue');
  });
  
  it('can set multiple styles on multiple elements', function() {
    $.find('li').css({'textAlign': 'center', 'marginTop': 5});
    expect($.q[0].style.textAlign).toBe('center');
    expect($.q[0].style.marginTop).toBe('5px');
    expect($.q[1].style.textAlign).toBe('center');
    expect($.q[1].style.marginTop).toBe('5px');
    expect($.q[2].style.textAlign).toBe('center');
    expect($.q[2].style.marginTop).toBe('5px');
    expect($.q[3].style.textAlign).toBe('center');
    expect($.q[3].style.marginTop).toBe('5px');
  });
  
  it('can use offset to fetch a hash of measurement data', function() {
    var tt = document.querySelector('#testTarget');
    tt.appendChild($.q[0]);
    var offset = $(tt).css({padding: 10, margin: 10}).show().find('#foo').offset();
    $(tt).hide();
    expect(offset.top).toBeTruthy();
    expect(offset.left).toBeTruthy();
    expect(offset.width).toBeTruthy();
    expect(offset.height).toBeTruthy();
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