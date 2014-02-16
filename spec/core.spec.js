describe('Core $', function() {
  
  it('is available globally as $', function() {
    expect(window.$).toBeTruthy();
  });
  
  it('stores a single element as query', function() {
    var el = document.querySelector('#testTarget');
    $(el);
    expect(Array.isArray($.q)).toBe(true);
    expect($.q[0]).toBe(el);
    expect($.q.length).toBe(1);
  });
  
  it('slices a NodeList into an array at .query', function() {
    var ul = document.createElement('ul');
    ul.innerHTML = '<li></li><li></li><li></li>';
    $(ul.querySelectorAll('li'));
    expect(Array.isArray($.q)).toBe(true);
    expect($.q.length).toBe(3);
  });
  
});

