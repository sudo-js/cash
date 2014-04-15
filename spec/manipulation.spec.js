describe('Manipulation', function() {
  
  beforeEach(function() {
    $.create('<div id="foo" class="bar"></div>').get(0).innerHTML =
      '<div id="baz"><ul><li id="one"></li><li id="two"></li></ul></div><div id="qux"><ul><li id="three"></li><li class="me"></li></ul></div>';
  });

  it('removes cache entries for an element removed with remove', function() {
    var div = $.q[0];
    expect($(div).find('li').q.length).toBe(4);
    $(div).find('li.me').on('click', $.noop);
    expect($.cache.events[$.q[0].getAttribute('cid')]).toBeTruthy();
    $(div).find('li.me').remove();
    expect($(div).find('li').q.length).toBe(3);
    expect($.cache.events[$.q[0].getAttribute('cid')]).toBeFalsy();
  });
  
});