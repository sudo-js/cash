describe('Remove', function () {

  beforeEach(function() {
    document.querySelector('#testTarget').innerHTML = '<div id="testTargetChildA"><div id="testTargetChildB" /></div>';
    $(document.querySelector('#testTargetChildA')).on('click', $.noop);
    $(document.querySelector('#testTargetChildB')).on('click', $.noop);

  });

  it('cleans up the cache for the element and its children', function() {
    var parent = document.querySelector('#testTargetChildA'),
        child  = document.querySelector('#testTargetChildB');

    expect(parent.cid).not.toBe(undefined);
    expect(parent.getAttribute('data-cash-id')).toBe(parent.cid);

    expect(child.cid).not.toBe(undefined);
    expect(child.getAttribute('data-cash-id')).toBe(child.cid);

    expect(Object.keys($.cache.events[parent.cid]).length).toBe(1);
    expect(Object.keys($.cache.events[child.cid]).length).toBe(1);

    $(parent).remove();

    expect($.cache.events[parent.cid]).toBe(undefined);
    expect($.cache.events[child.cid]).toBe(undefined);
  });

  it('removes the element from the dom', function() {
    var parent = document.querySelector('#testTargetChildA');
    $(parent).remove();
    expect(parent.parentNode).toBeFalsy();
  });

});
