beforeEach(function() {
  window.counter = 0;
  window.callBack = function(e) {
    console.log('called ' + (++window.counter));
  };
  
  window.callBackWithData = function(e) {
    console.log('called with custom data: ' + e.data.custom);
  };
});

afterEach(function() {
  document.querySelector('#testTarget').innerHTML = '';
});

describe('cash event binding', function() {
  
  beforeEach(function() {
    document.querySelector('#testTarget').innerHTML =
      '<div id="baz"><ul><li></li><li></li></ul></div><div id="qux"><ul><li></li><li class="me"></li></ul></div>';
  });
  
  it('records the bound event in the cache', function() {
    $(document.querySelector('#testTarget')).on('click', window.callBack);
    expect($.cache.events[$.q[0].cid]).toBeTruthy();
    $.off('click');
  });
  
  it('can be bound and unbound, no sel or data', function() {
    var spy = spyOn(window, 'callBack').andCallThrough();
    expect(spy.callCount).toBe(0);
    $(document.querySelector('#testTarget')).on('click', window.callBack).trigger('click');
    expect(spy.callCount).toBe(1);
    $.off('click').trigger('click');
    expect(spy.callCount).toBe(1);
  });
  
  it('can be bound and unbound, delegated via sel', function() {
    var spy = spyOn(window, 'callBack').andCallThrough();
    expect(spy.callCount).toBe(0);
    $(document.querySelector('#testTarget')).on('click', window.callBack, 'li.me');
    $(document.querySelector('#testTarget')).find('ul').trigger('click');
    expect(spy.callCount).toBe(0);
    $(document.querySelector('#testTarget')).find('li').trigger('click');
    expect(spy.callCount).toBe(1);
    $(document.querySelector('#testTarget')).find('li.me').trigger('click');
    expect(spy.callCount).toBe(2);        
    $(document.querySelector('#testTarget')).off('click').find('li.me').trigger('click');
    expect(spy.callCount).toBe(2);
  });
  
  it('passes custom data with the event', function() {
    var spy = spyOn(window, 'callBackWithData').andCallThrough();
    $(document.querySelector('#testTarget')).on('click', window.callBackWithData, null, 
      {custom: 'soCustom'}).trigger('click').off('click');
    expect(spy).toHaveBeenCalled();
    $(document.querySelector('#testTarget')).on('click', window.callBackWithData, 'div:last-child', 
      {custom: 'soSoCustom'}).find('div:last-child').trigger('click');
    expect(spy).toHaveBeenCalled();
  });
  
});