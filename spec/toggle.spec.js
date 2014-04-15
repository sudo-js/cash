describe('Toggle', function() {
  
  beforeEach(function() {
    document.querySelector('#testTarget').innerHTML = '';
  });
  
  it('toggles correctly with default "display"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        el;

    div.innerHTML   = '<span id="el">foobar</span>';

    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).toggle();

    expect(getComputedStyle(el).display).toEqual('none');
    expect(el.style.display).toEqual('none');
    expect($.cache.display[el.getAttribute('cid')]).toBe(undefined);

    $(el).toggle();

    expect(getComputedStyle(el).display).toEqual('inline');
    expect(el.style.display).toEqual('');
    expect($.cache.display[el.getAttribute('cid')]).toBe('none');
  });

  it('toggles correctly with inline "display: none"', function() {
    var body = document.querySelector('#testTarget'),
        div  = document.createElement('div'),
        el;

    div.innerHTML   = '<span id="el" style="display: none;">foobar</span>';

    body.appendChild(div);

    el = body.querySelector('#el');

    $(el).toggle();

    expect(getComputedStyle(el).display).toEqual('inline');
    expect(el.style.display).toEqual('');
    expect($.cache.display[el.getAttribute('cid')]).toBe('none');

    $(el).toggle();

    expect(getComputedStyle(el).display).toEqual('none');
    expect(el.style.display).toEqual('none');
    expect($.cache.display[el.getAttribute('cid')]).toBe(undefined);
  });
  
  it('toggles correctly with both', function() {
    var body = document.querySelector('#testTarget'),
        div1  = document.createElement('div'),
        div2  = document.createElement('div'),
        els;

    div1.innerHTML   = '<span class="el" style="display: none;">foobar</span>';
    div2.innerHTML   = '<span class="el">foobar</span>';

    body.appendChild(div1);
    body.appendChild(div2);

    els = body.querySelectorAll('.el');

    $(els).toggle();

    expect(getComputedStyle(els[0]).display).toEqual('inline');
    expect(els[0].style.display).toEqual('');
    expect($.cache.display[els[0].getAttribute('cid')]).toBe('none');
    
    expect(getComputedStyle(els[1]).display).toEqual('none');
    expect(els[1].style.display).toEqual('none');
    expect($.cache.display[els[1].getAttribute('cid')]).toBe(undefined);

  });
});