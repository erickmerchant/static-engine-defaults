var tap = require('tap')
var plugin = mock({
  './test/content/defaults.json': '{ "alpha": "a", "beta": "b" }'
})

tap.test('it should affect all pages', function (t) {
  var defaults = plugin('./test/content/defaults.json', JSON.parse)

  defaults([{}, {}], function (err, pages) {
    t.equal(null, err)
    t.deepEqual(pages, [
      {alpha: 'a', beta: 'b'},
      {alpha: 'a', beta: 'b'}
    ])

    t.end()
  })
})

tap.test('it should not overwrite existing properties', function (t) {
  var defaults = plugin('./test/content/defaults.json', JSON.parse)

  defaults([{alpha: 1}, {alpha: 2}], function (err, pages) {
    t.equal(null, err)
    t.deepEqual(pages, [
      {alpha: 1, beta: 'b'},
      {alpha: 2, beta: 'b'}
    ])

    t.end()
  })
})

tap.test('it should handle errors from fs.readFile', function (t) {
  var plugin = mock({
    './test/content/defaults.json': '{ "alpha": "a", "beta": "b" }'
  }, {
    fs: new Error('fs.readFile error!')
  })
  var defaults = plugin('./test/content/defaults.json', JSON.parse)

  defaults([{}, {}], function (err) {
    t.equal('fs.readFile error!', err.message)

    t.end()
  })
})

tap.test('it should handle errors from the converter', function (t) {
  var plugin = mock({
    './test/content/defaults.json': '{ "alpha": "a", "beta": "b" }'
  })
  var defaults = plugin('./test/content/defaults.json', function () {
    throw new Error('parse error!')
  })

  defaults([{}, {}], function (err) {
    t.equal('parse error!', err.message)

    t.end()
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
