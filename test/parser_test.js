'use strict';

var parser = require('../lib/parse');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.parser = {
  setUp: function(done) {
    this.defaultOptions = {
      parser: Number
    };

    done();
  },

  integer: function(test) {
    test.deepEqual(
      parser({
        a: '8'
      }, this.defaultOptions),
      {
        a: 8
      },
      'Should convert integers.'
    );

    test.done();
  },

  radix: function(test) {
    test.deepEqual(
      parser({
        a: '08'
      }, this.defaultOptions),
      {
        a: 8
      },
      'Should convert strings starting with 0.'
    );

    test.done();
  },

  float: function(test) {
    test.deepEqual(
      parser({
        a: '0.8'
      }, this.defaultOptions),
      {
        a: 0.8
      },
      'Should convert floating point numbers.'
    );

    test.done();
  },

  deep: function(test) {
    test.deepEqual(
      parser({
        a: {
          b: '8'
        }
      }, this.defaultOptions),
      {
        a: {
          b: 8
        }
      },
      'Should convert recursively.'
    );

    test.done();
  },

  array: function(test) {
    test.deepEqual(
      parser(['8'], this.defaultOptions),
      [8],
      'Should convert array items.'
    );

    test.done();
  },

  deepArray: function(test) {
    test.deepEqual(
      parser({
        a: ['8', ['9'], { a: '7' }],
      }, this.defaultOptions),
      {
        a: [8, [9], { a: 7 }],
      },
      'Should convert arrays recursively.'
    );

    test.done();
  },

  string: function(test) {
    test.deepEqual(
      parser({
        a: 'string'
      }, this.defaultOptions),
      {
        a: 'string'
      },
      'Should not convert regular string.'
    );

    test.deepEqual(
      parser({
        a: '10.0.0.1'
      }, this.defaultOptions),
      {
        a: '10.0.0.1'
      },
      'Should not convert IP string.'
    );

    test.deepEqual(
      parser({
        a: '106e04cf-344b-4c1c-98a0-002a67df7099'
      }, this.defaultOptions),
      {
        a: '106e04cf-344b-4c1c-98a0-002a67df7099'
      },
      'Should not convert UUID string.'
    );

    test.done();
  }
};
