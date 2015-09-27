'use strict';
require('chai').should();

describe('redefine-properties', function() {
  var redefine = require('../lib/redefine-properties.js');

  it('should be a function', function() {
    redefine.should.be.a('function');
  });

});