describe('Utils', function() {
  it('uses the isObject method correctly', function() {
    expect($.isObject([])).toBe(false);
    expect($.isObject({})).toBe(true);
  });

  it('serializes a hash into a "params" type string', function() {
    expect($.serialize({foo: 'bar', baz: 'qux'})).toEqual("foo=bar&baz=qux");
  });

  it('encodes and decodes properties correctly', function(){
    var data = {foo: "bar bells", baz: "qux capacitor"},
    ser = $.serialize(data),
    des = $.deserialize(ser);

    expect(ser).toEqual("foo=bar%20bells&baz=qux%20capacitor");
    expect(des).toEqual(data);
  });

  it('deserializes a params-type str into a hash', function() {
    expect($.deserialize("foo=bar&baz=qux")).toEqual({foo: 'bar', baz: 'qux'});
  });

  it('extends an object', function() {
    var one = {foo: 'bar'}, two = {foo: 'baz', qux: {vop: ['zim']}};
    expect(one.foo).toBe('bar');
    $.extend(one, two);
    expect(one.foo).toBe('baz');
    expect(one.qux.vop[0]).toBe('zim');
  });
});
