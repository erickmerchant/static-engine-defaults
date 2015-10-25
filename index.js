var fs = require('fs')
var assign = require('lodash.assign')

module.exports = function (defaultFile, converter) {
  return function (pages, done) {
    fs.readFile(defaultFile, { encoding: 'utf-8' }, function (err, data) {
      var defaults

      if (err) {
        done(err)
      } else {
        try {
          defaults = converter(data)

          pages.forEach(function (val, key) {
            pages[key] = assign({}, defaults, val)
          })

          done(null, pages)
        } catch (e) {
          done(e)
        }
      }
    })
  }
}
