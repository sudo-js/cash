describe('CSS', function() {
  
  beforeEach(function() {
    var el = $.create('<div id="foo" class="bar"></div>').q[0];
    el.innerHTML = '<div id="baz"><ul><li></li><li></li></ul></div><div id="qux"><ul><li></li><li class="me"></li></ul></div>';
      
    $(document.querySelector('#testTarget')).show().get(0).appendChild(el);
    $(document.querySelector('#foo'));
  });
  
  afterEach(function() {
    $(document.querySelector('#testTarget')).hide();
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
});