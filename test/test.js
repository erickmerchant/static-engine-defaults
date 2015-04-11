var mock = require('mock-fs')
var assert = require('assert')
var describe = require('mocha').describe
var it = require('mocha').it
var beforeEach = require('mocha').beforeEach
var defaults = require('../index.js')

beforeEach(function () {
  mock({
    './test/content/defaults.json': '{ "alpha": "a", "beta": "b" }'
  })
})

describe('plugin', function () {
  it('it should affect all pages', function (done) {
    var plugin = defaults('./test/content/defaults.json', JSON.parse)

    plugin([{}, {}], function (err, pages) {
      if (err) {
        throw err
      }

      assert.deepEqual(pages, [
        {alpha: 'a', beta: 'b'},
        {alpha: 'a', beta: 'b'}
      ])

      done()
    })
  })

  it('it should not overwrite existing properties', function (done) {
    var plugin = defaults('./test/content/defaults.json', JSON.parse)

    plugin([{alpha: 1}, {alpha: 2}], function (err, pages) {
      if (err) {
        throw err
      }

      assert.deepEqual(pages, [
        {alpha: 1, beta: 'b'},
        {alpha: 2, beta: 'b'}
      ])

      done()
    })
  })
})
