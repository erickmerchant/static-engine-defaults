var assert = require('assert')
var describe = require('mocha').describe
var it = require('mocha').it
var plugin = mock({
  './test/content/defaults.json': '{ "alpha": "a", "beta": "b" }'
})

describe('plugin', function () {
  it('it should affect all pages', function (done) {
    var defaults = plugin('./test/content/defaults.json', JSON.parse)

    defaults([{}, {}], function (err, pages) {
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
    var defaults = plugin('./test/content/defaults.json', JSON.parse)

    defaults([{alpha: 1}, {alpha: 2}], function (err, pages) {
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

function mock (files) {
  var rewire = require('rewire')
  var plugin = rewire('./index.js')

  plugin.__set__('fs', {
    readFile: function (filename, options, callback) {
      callback(null, files[filename])
    }
  })

  return plugin
}
