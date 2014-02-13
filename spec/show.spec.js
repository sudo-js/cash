describe('Show', function () {
  
  beforeEach(function() {
    document.querySelector('#testTarget').innerHTML = '';
  });
  
  it('shows an element with default "display"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        style = document.createElement('style'),
        el;

    div.innerHTML   = '<span id="el">foobar</span>';
    style.innerHTML = '';

    body.appendChild(style);
    body.appendChild(div);

    el = body.querySelector('#el');
    $(el).show();

    expect($(el).css('display')).toBe('inline');
    expect(el.style.display).toBe('');
    expect(el.getAttribute('data-old-display')).toBe(null);
  });

  it('shows an element with inline "display"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        style = document.createElement('style'),
        el;

    div.innerHTML   = '<span id="el" style="display: block;">foobar</span>';
    style.innerHTML = '';

    body.appendChild(style);
    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).show();

    expect(getComputedStyle(el).display).toEqual('block');
    expect(el.style.display).toEqual('block');
    expect(el.getAttribute('data-old-display')).toBe(null);
  });

  it('shows an element with inline "display: none"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        style = document.createElement('style'),
        el;

    div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';
    style.innerHTML = '';

    body.appendChild(style);
    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).show();

    expect(getComputedStyle(el).display).toEqual('inline');
    expect(el.style.display).toBe('');
    expect($.cache.display[el.cid]).toEqual('none');
  });

  it('shows an element with css "display"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        style = document.createElement('style'),
        el;

    div.innerHTML   = '<span id="el">foobar</span>';
    style.innerHTML = '#el { display: block; }';

    body.appendChild(style);
    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).show();

    expect(getComputedStyle(el).display).toEqual('block');
    expect(el.style.display).toEqual('');
    expect($.cache.display[el.cid]).toBe(undefined);
  });

  it('shows a node with css "display: none"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        style = document.createElement('style'),
        el;

    div.innerHTML   = '<span id="el">foobar</span>';
    style.innerHTML = '#el { display: none; }';

    body.appendChild(style);
    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).show();

    expect(getComputedStyle(el).display).toEqual('block');
    expect(el.style.display).toEqual('block');
    expect(el.getAttribute('data-old-display')).toBe(null);
  });

  it('shows an element with inline "display" and css "display: none"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        style = document.createElement('style'),
        el;

    div.innerHTML   = '<span id="el" style="display: block;">foobar</span>';
    style.innerHTML = '#el { display: none; }';

    body.appendChild(style);
    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).show();

    expect(getComputedStyle(el).display).toEqual('block');
    expect(el.style.display).toEqual('block');
    expect(el.getAttribute('data-old-display')).toBe(null);
  });

  it('shows an element with inline "display: none" and css "display"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        style = document.createElement('style'),
        el;

    div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';
    style.innerHTML = '#el { display: block; }';

    body.appendChild(style);
    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).show();

    expect(getComputedStyle(el).display).toEqual('block');
    expect(el.style.display).toEqual('');
    expect($.cache.display[el.cid]).toBe('none');
  });
});