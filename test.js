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
      assert.equal(null, err)
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
      assert.equal(null, err)
      assert.deepEqual(pages, [
        {alpha: 1, beta: 'b'},
        {alpha: 2, beta: 'b'}
      ])

      done()
    })
  })

  it('it should handle errors from fs.readFile', function (done) {
    var plugin = mock({
      './test/content/defaults.json': '{ "alpha": "a", "beta": "b" }'
    }, {
      fs: new Error('fs.readFile error!')
    })
    var defaults = plugin('./test/content/defaults.json', JSON.parse)

    defaults([{}, {}], function (err) {
      assert.equal('fs.readFile error!', err.message)

      done()
    })
  })

  it('it should handle errors from the converter', function (done) {
    var plugin = mock({
      './test/content/defaults.json': '{ "alpha": "a", "beta": "b" }'
    })
    var defaults = plugin('./test/content/defaults.json', function () {
      throw new Error('parse error!')
    })

    defaults([{}, {}], function (err) {
      assert.equal('parse error!', err.message)

      done()
    })
  })
})

function mock (files, errors) {
  var rewire = require('rewire')
  var plugin = rewire('./index.js')

  plugin.__set__('fs', {
    readFile: function (filename, options, callback) {
      if (errors && errors.fs) {
        callback(errors.fs)
      } else {
        callback(null, files[filename])
      }
    }
  })

  return plugin
}
