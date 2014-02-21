describe('cash event binding', function() {
  
  beforeEach(function() {
    window.callBack = function(e) {
      console.log('called');
    };
    $.create('<div id="foo" class="bar"></div>').q[0].innerHTML = 
      '<div id="baz"><ul><li></li><li></li></ul></div><div id="qux"><ul><li></li><li class="me"></li></ul></div>';
  });
  
  it('records the bound event in the cache', function() {
    $.on('click', window.callBack);
    expect($.cache.events[$.q[0].cid]).toBeTruthy();
  });
  
  it('can be bound and unbound, no sel or data', function() {
    var spy = spyOn(window, 'callBack').andCallThrough();
    expect(spy.callCount).toBe(0);
    $.on('click', window.callBack).trigger('click');
    expect(spy.callCount).toBe(1);
    $.off('click').trigger('click');
    expect(spy.callCount).toBe(1);
  });
  
});