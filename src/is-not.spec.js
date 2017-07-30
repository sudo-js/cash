const $$ = require('./index').$$;
const $ = require('./index').$;

const createElement = require('./functions').createElement;

describe('Is and not', function() {

  beforeEach(function() {
    let el = createElement('<div id="foo" class="bar"><div id="baz"><ul><li id="one"></li><li id="two"></li></ul></div><div id="qux"><ul><li id="three"></li><li class="me"></li></ul></div></div>');
    $(el);
  });

  it('reduces the q via not', function() {
    expect($$.find('div').q.length).toBe(2);
    expect($$.not('div#baz').q.length).toBe(1);
  });

  it('reduces the q via is', function() {
    expect($$.find('div').q.length).toBe(2);
    expect($$.is('div#baz').q.length).toBe(1);
  });

});