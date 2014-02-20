describe('Hide', function () {
  
  beforeEach(function() {
    document.querySelector('#testTarget').innerHTML = '';
  });
  
  it('hides an element with default "display"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        el;

    div.innerHTML   = '<span id="el">foobar</span>';

    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).hide();

    expect(getComputedStyle(el).display).toBe('none');
    expect(el.style.display).toBe('none');
    expect($.cache.display[el.cid]).toBe(undefined);
  });

  it('hides an element with inline "display"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        el;

    div.innerHTML   = '<span id="el" style="display: block;">foobar</span>';

    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).hide();

    expect(getComputedStyle(el).display).toEqual('none');
    expect(el.style.display).toEqual('none');
    expect($.cache.display[el.cid]).toBe('block');
  });

  it('hides an element with inline "display: none"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        el;

    div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';

    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).hide();

    expect(getComputedStyle(el).display).toEqual('none');
    expect(el.style.display).toBe('none');
    expect($.cache.display[el.cid]).toBe(undefined);
  });

  it('hides an element with css "display"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        style = document.createElement('style'),
        el;

    div.innerHTML   = '<span id="el">foobar</span>';
    style.innerHTML = '#el { display: block; }';

    body.appendChild(style);
    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).hide();

    expect(getComputedStyle(el).display).toEqual('none');
    expect(el.style.display).toEqual('none');
    expect($.cache.display[el.cid]).toBe(undefined);
  });

  it('hides an element with css "display: none"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        style = document.createElement('style'),
        el;

    div.innerHTML   = '<span id="el">foobar</span>';
    style.innerHTML = '#el { display: none; }';

    body.appendChild(style);
    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).hide();

    expect(getComputedStyle(el).display).toEqual('none');
    expect(el.style.display).toEqual('');
    expect($.cache.display[el.cid]).toBe(undefined);
  });

  it('hides an element with inline "display" and css "display: none"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        style = document.createElement('style'),
        el;

    div.innerHTML   = '<span id="el" style="display: block;">foobar</span>';
    style.innerHTML = '#el { display: none; }';

    body.appendChild(style);
    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).hide();

    expect(getComputedStyle(el).display).toEqual('none');
    expect(el.style.display).toEqual('none');
    expect($.cache.display[el.cid]).toEqual('block');
  });

  it('hides an element with inline "display: none" and css "display"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        style = document.createElement('style'),
        el;

    div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';
    style.innerHTML = '#el { display: block; }';

    body.appendChild(style);
    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).hide();

    expect(getComputedStyle(el).display).toEqual('none');
    expect(el.style.display).toEqual('none');
    expect($.cache.display[el.cid]).toBe(undefined);
  });
  });