describe('Manipulation', function() {
  beforeEach(function() {
    document.querySelector('#testTarget').innerHTML = '<div id="testTargetChildA"><div id="testTargetChildB" /></div>';
    $(document.querySelector('#testTargetChildA')).on('click', $.noop);
    $(document.querySelector('#testTargetChildB')).on('click', $.noop);

  });

  it('cleans up the cache for the element and its children', function() {
    var parent = document.querySelector('#testTargetChildA'),
        child  = document.querySelector('#testTargetChildB');

    expect(parent.getAttribute('cid')).toBeTruthy();

    expect(child.getAttribute('cid')).toBeTruthy();

    expect(Object.keys($.cache.events[parent.getAttribute('cid')]).length).toBe(1);
    expect(Object.keys($.cache.events[child.getAttribute('cid')]).length).toBe(1);

    $(parent).remove();

    expect($.cache.events[parent.getAttribute('cid')]).toBeFalsy();
    expect($.cache.events[child.getAttribute('cid')]).toBeFalsy();
  });

  it('removes the element from the dom', function() {
    var parent = document.querySelector('#testTargetChildA');
    $(parent).remove();
    expect(parent.parentNode).toBeFalsy();
  });
  
  it('can create an element with class and id', function() {
    $.create('<div id="foo" class="bar"></div>');
    expect($.q[0].id).toBe('foo');
    expect($.q[0].classList.contains('bar')).toBe(true);
  });
});