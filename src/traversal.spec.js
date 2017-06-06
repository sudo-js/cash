const $$ = require('./index').cash;
const $ = $$.init.bind($$);

const createElement = require('./functions').createElement;

describe('Traversal', function() {
  
  beforeEach(function() {
    let el = createElement('<div id="foo" class="bar"><div id="baz"><ul><li id="one"></li><li id="two"></li></ul></div><div id="qux"><ul><li id="three"></li><li class="me"></li></ul></div></div>');
    $(el);
  });
  
  it('can rebuild the q to a specified selector via find', function() {
    expect($$.find('div').q.length).toBe(2);
    expect($$.find('li').q.length).toBe(4);
  });
  
  it('can reduce the q to a specified el via find', function() {
    expect($$.find('.me').q.length).toBe(1);
  });
  
  it('can reduce the q to a specified selectors parent via contains', function() {
    var parent = $$.q[0].querySelectorAll('div')[1],
      me = parent.querySelector('.me');
    expect($$.find('div').contains(me).q.length).toBe(1);
    expect($$.q[0]).toEqual(parent);
  });
  
  it('uses closest to reduce the q to those matching parents', function() {
    var ul = $$.q[0].querySelector('#qux').querySelector('ul');
    expect($$.find('li.me').closest('ul').q[0]).toEqual(ul);
  });
  
  it('when using closest, does not insert copies', function() {
    expect($$.find('li').closest('ul').q.length).toEqual(2);
  });
  
  it('returns an empty q if nothing found with closest', function() {
    expect($$.find('li').closest('blink').q.length).toEqual(0);
  });
  
  it('rehydrates the q with parent elements via parent', function() {
    expect($$.find('li').parent().get().length).toBe(2);
    expect($$.get(0).tagName).toBe('UL');
    expect($$.get(1).tagName).toBe('UL');
  });
  
  it('rehydrates the q with parents via parents, fragment', function() {
    expect($$.find('li:first-child').parents().get().length).toBe(5);
  });
  
  it('rehydrates the q with parents via parents, non fragment', function() {
    var tt = document.createElement('div');
    tt.appendChild($$.get(0));
    expect($(tt).find('li#one').parents().get().length).toBe(4);
  });
  
});