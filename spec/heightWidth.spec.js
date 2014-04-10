describe('Height and width', function() {
  
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
  
});