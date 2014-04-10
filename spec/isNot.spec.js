describe('Is and not', function() {
  
  beforeEach(function() {
    $.create('<div id="foo" class="bar"></div>').get(0).innerHTML =
      '<div id="baz"><ul><li id="one"></li><li id="two"></li></ul></div><div id="qux"><ul><li id="three"></li><li class="me"></li></ul></div>';
  });
  
  it('reduces the q via not', function() {
    expect($.find('div').q.length).toBe(2);
    expect($.not('div#baz').q.length).toBe(1);
  });
  
});