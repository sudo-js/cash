describe('Core $', function() {
  
  it('is available globally as $', function() {
    expect(window.$).toBeTruthy();
  });
  
  it('stores an element as query', function() {
    var el = document.querySelector('#testTarget');
    $(el);
    expect($.query).toBe(el);
    expect($.length).toBe(1);
  });
  
});

