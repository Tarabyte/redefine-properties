'use strict';
require('chai').should();

describe('redefine-properties', function() {
  var redefine = require('../lib/redefine-properties.js');

  it('should be a function', function() {
    redefine.should.be.a('function');
  });

  it('should throw when called w/o target', function() {
    (function() {
      redefine()
    }).should.throw();
  });

  it('should throw when called w/o sources at all', function() {
    (function() {
      redefine({});
    }).should.throw();
  });

  it('should copy properties from sources', function() {
    var source = {a: 1, b: 2},
      target = {};

    redefine(target, source);

    target.should.be.deep.equal(source);
  });

  it('should return a target', function() {
    var source = {a: 1, b: 2},
      target = {};

    var out = redefine(target, source);
    out.should.be.equal(target);
  });

  it('should copy nonenumerable properties', function() {
    var source = {},
      target = {};

    Object.defineProperty(source, 'a', {
      value: 1,
      enumerable: false
    });

    redefine(target, source);

    target.should.have.property('a', 1);
  });

  it('should copy from 2 sources', function () {
    var source1 = {a: 1}, source2 = {b: 2}, target = {};

    redefine(target, source1, source2);

    target.should.be.deep.equal({a:1, b: 2});
  });

  it('should copy from multiple sources', function () {
    var target = {},
      sources = Array.apply(null, new Array(10)).map(function(_, i){
        var source = {};
        source['prop' + i] = i;
        return source;
      }),
      keys = sources.map(function(_, i) {
        return 'prop' + i;
      });

    redefine.apply(null, [target].concat(sources));


    target.should.have.all.keys(keys);
  });

  it('should not use prototype properties', function() {
    var source = Object.create({a: 1}),
      target = {};

    source.b = 2;

    redefine(target, source);

    target.should.be.deep.equal({b: 2});

  });

  it('should copy get/set properties', function() {
    var source = {
      _a: 1,
      get a() {
        return this._a;
      },
      set a(val) {
        this._a = val;
      }
    },
    target = {};

    redefine(target, source);

    target.should.have.property('a', 1);
    target.a = 2;
    target.should.have.property('_a', 2);
    target.a.should.be.equal(2);
  });

  it('should override properties', function() {
    var target = {a: 1};

    redefine(target, {a: 2}, {a: 3});

    target.should.have.property('a', 3);
  });

  describe('Example', function() {
    it('should return 42', function() {
      var source = {
        get a() {
          return 42;
        }
      };
      var target = {};

      redefine(target, source);

      (target.a === 42).should.be.true;
    })
  })

});