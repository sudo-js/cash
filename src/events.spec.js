const $$ = require('./index').cash;
const $ = $$.init.bind($$);
  
describe('Events', function() {

  beforeEach(function() {
    window.counter = 0;
    window.counterFoo = 0;

    window.callBack = function(e) {
      if(e.namespace) return;
      console.log('called with no namespace ' + (++window.counter));
    };

    window.callBackWithData = function(e) {
      console.log('called with custom data: ' + e.data.custom);
    };

    window.callBackWithNs = function(e) {
      if(e.namespace !== 'foo') return;
      console.log('called with ' + e.namespace + ' namespace: ' + (++window.counterFoo));
    };

    window.changeCallBackWithNs = function(e) {
      if(e.namespace !== 'foo') return;
      console.log('called with ' + e.namespace + ' namespace: ' + (++window.counterFoo));
    };
    
    this.tt = document.createElement('div');
    
    this.tt.innerHTML =
      '<div id="baz"><ul><li id="li1"></li><li id="li2"></li></ul></div><div id="qux"><ul><li></li><li class="me"></li></ul></div>';
  });
  
  afterEach(function() {
    // make sure to clean up bound events
    $(this.tt).off('*');
    this.tt.innerHTML = '';
  });

  it('records the bound event in the cache', function() {
    $(this.tt).on('click', window.callBack);
    expect($$.cache.events[$$.q[0].getAttribute('cid')]).toBeTruthy();
  });

  it('can be bound and unbound, no sel or data', function() {
    spyOn(window, 'callBack').and.callThrough();
    expect(window.callBack.calls.any()).toBe(false);
    $(this.tt).on('click', window.callBack).trigger('click');
    expect(window.callBack.calls.count()).toBe(1);
    $(this.tt).off('click').trigger('click');
    expect(window.callBack.calls.count()).toBe(1);
  });

  it('can be bound and unbound, delegated via sel', function() {
    var spy = spyOn(window, 'callBack').and.callThrough();
    expect(spy.calls.any()).toBe(false);
    $(this.tt).on('click', window.callBack, 'li.me');
    $(this.tt).find('ul').trigger('click');
    expect(spy.calls.any()).toBe(false);
    $(this.tt).find('li').trigger('click');
    expect(spy.calls.count()).toBe(1);
    $(this.tt).find('li.me').trigger('click');
    expect(spy.calls.count()).toBe(2);
    $(this.tt).off('click').find('li.me').trigger('click');
    expect(spy.calls.count()).toBe(2);
  });

  it('passes custom data with the event', function() {
    var spy = spyOn(window, 'callBackWithData').and.callThrough();
    $(this.tt).on('click', window.callBackWithData, null,
      {custom: 'soCustom'}).trigger('click').off('click');
    expect(spy).toHaveBeenCalled();
    $(this.tt).on('click', window.callBackWithData, 'div:last-child',
      {custom: 'soSoCustom'}).find('div:last-child').trigger('click');
    expect(spy).toHaveBeenCalled();
  });

  it('binds, unbinds and honors namespaced events', function() {
    var spy1 = spyOn(window, 'callBack').and.callThrough();
    var spy2 = spyOn(window, 'callBackWithNs').and.callThrough();
    // both will trigger on click as we do not override the native event object
    $(this.tt).on('click', window.callBack).on('click.foo', window.callBackWithNs).trigger('click');
    expect(spy1.calls.count()).toBe(1);
    expect(spy2.calls.count()).toBe(1);
    // it will have been called but the listener would not have recieved the ns
    expect(window.counter).toBe(1);
    expect(window.counterFoo).toBe(1);
    $(this.tt).off('click.foo').trigger('click');
    expect(spy1.calls.count()).toBe(2);
    // it will have been called but the listener would not have recieved the ns
    expect(window.counter).toBe(2);
    expect(window.counterFoo).toBe(1);
  });

  it('can unbind all events in a namespace', function() {
    var spy1 = spyOn(window, 'callBack').and.callThrough();
    var spy2 = spyOn(window, 'callBackWithNs').and.callThrough();
    var spy3 = spyOn(window, 'changeCallBackWithNs').and.callThrough();

    $(this.tt).on('click', window.callBack).
          on('click.foo', window.callBackWithNs).
          on('change.foo', window.changeCallBackWithNs).
          trigger('click');

    // no change has happened. generic clicks have occurred.
    expect(spy1.calls.count()).toBe(1);
    expect(spy2.calls.count()).toBe(1);
    expect(spy3.calls.count()).toBe(0);

    // the click event invokes all click callbacks
    expect(window.counter).toBe(1);
    expect(window.counterFoo).toBe(1);

    // now trigger a change
    $(this.tt).trigger('change');

    // clicks should not have been invoked
    expect(spy1.calls.count()).toBe(1);
    expect(spy2.calls.count()).toBe(1);
    expect(spy3.calls.count()).toBe(1);

    // change.foo is the only callback. foo should have been incremented.
    expect(window.counter).toBe(1);
    expect(window.counterFoo).toBe(2);

    // remove all foo events and trigger a click and a change
    $(this.tt).off('*.foo').trigger('change').trigger('click');

    // the standard click event should be fired
    expect(spy1.calls.count()).toBe(2);
    // the foo callbacks should not get called
    expect(spy2.calls.count()).toBe(1);
    expect(spy3.calls.count()).toBe(1);

    // and our counters should reflect the above statements.
    expect(window.counter).toBe(2);
    expect(window.counterFoo).toBe(2);
  });

  // this came from a bug where when a selector matched two elements
  // and when triggered consecutively, the second element's callback
  // would get called but with a reference to the other element's delegateTarget.
  it('does not keep references to previous callbacks', function() {
    var target,
      fa = function(e){ target = e.delegateTarget; },
      fb = function(e){ target = e.delegateTarget; },
      li1 = this.tt.querySelector('#li1'),
      li2 = this.tt.querySelector('#li2');

    $(this.tt).on('click', fa, '#baz li').on('click', fb, '#baz li');

    $(li1).trigger('click');
    expect(target.id).toEqual(li1.id);
    $(li2).trigger('click');
    expect(target.id).toEqual(li2.id);

  });
  
  it('on can be insructed to use the capture phase for on and off', function() {
    var ary = [];
    window.meFirst = function() {ary.push('capture');};
    window.meSecond = function() {ary.push('bubble');};
    
    $(this.tt).on('click', window.meFirst, null, null, true).on('click', window.meSecond);
    expect($$.cache.events[this.tt.getAttribute('cid')].click[0].cap).toBe(true);
    $$.trigger('click');
    expect(ary[0]).toBe('capture');
    expect(ary[1]).toBe('bubble');
    // should not work
    $$.off('click', window.meFirst).trigger('click');
    expect(ary[2]).toBe('capture');
    expect(ary[3]).toBe('bubble');
    
    $$.off('click', window.meFirst, true).trigger('click');
    expect(ary[4]).toBe('bubble');
    $$.off('click', window.meSecond).trigger('click');
    expect(ary.length).toBe(5);  
  });
  
  it('will force capture on focus and blur if delegated', function() {
    window.focused = 0;
    window.blurred = 0;
    window.handleFocus = function(e) {
      window.focused++;
      window.whoCalled = e.target.name;
    };
    window.handleBlur = function(e) {
      window.blurred++;
      window.whoCalled = e.target.name;
    };
    
    this.tt.innerHTML = '<div><input type="text" name="one"></input><input type="text" name="two"></input></div>';
    $(this.tt).on('focus', window.handleFocus, 'input[name="two"]').on('blur', window.handleBlur, 'input[name="two"]');
    expect($$.cache.events[this.tt.getAttribute('cid')].focus[0].cap).toBe(true);
    expect($$.cache.events[this.tt.getAttribute('cid')].blur[0].cap).toBe(true);
    $(this.tt).find('input[name="two"]').trigger('focus');
    expect(window.focused).toBe(1);
    expect(window.whoCalled).toBe('two');
    window.whoCalled = '';
    $(this.tt).find('input[name="two"]').trigger('blur');
    expect(window.blurred).toBe(1);
    expect(window.whoCalled).toBe('two');
    window.whoCalled = '';
    $(this.tt).find('input[name="one"]').trigger('focus').trigger('blur');
    expect(window.focused).toBe(1);
    expect(window.blurred).toBe(1);
    expect(window.whoCalled).toBe('');
  });
  
  it('will correctly use native click() on inputs', function() {
    var currentCount = window.counter;
    this.tt.insertAdjacentHTML('beforeend', '<input type="btn" id="clickTest">Test Click</input>');
    $(this.tt.querySelector('#clickTest')).on('click', window.callBack).trigger('click');
    expect(window.counter).toBe(currentCount + 1);
  });

});
