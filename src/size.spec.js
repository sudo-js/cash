const $$ = require('./index').$$;
const $ = require('./index').$;

const createElement = require('./functions').createElement;

describe('Style', function() {

  beforeEach(function() {
    let el = createElement('<div id="foo" class="bar"></div>');
    document.body.appendChild(el);
    $(document.querySelector('#foo'));
  });


  it('can use offset to fetch a hash of measurement data', function() {
    var offset = $$.style({padding: 10, margin: 10, width: 10, height: 10}).offset();

    expect(offset.top).toBeTruthy();
    expect(offset.left).toBeTruthy();
    expect(offset.width).toBe(30);
    expect(offset.height).toBe(30);
    expect(offset.right).toBe(offset.left + 30);
    expect(offset.bottom).toBe(offset.top + 30);
  });
});